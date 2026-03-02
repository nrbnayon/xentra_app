/**
 * notifications.ts
 *
 * Core push notification service for Xentra.
 * Handles: permission requests, Expo push token registration,
 * Android channel creation, foreground presentation handler,
 * background task registration, and deep-link routing from taps.
 *
 * Works in BOTH development and production on iOS & Android.
 */

import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import { Platform } from "react-native";

// ─── Constants ────────────────────────────────────────────────────────────────

export const BACKGROUND_NOTIFICATION_TASK = "XENTRA_BACKGROUND_NOTIFICATION";

const LOG_TAG = "[Notifications]";

// ─── Debug logger ─────────────────────────────────────────────────────────────

function log(message: string, data?: unknown) {
  if (__DEV__) {
    if (data !== undefined) {
      console.log(`${LOG_TAG} ${message}`, JSON.stringify(data, null, 2));
    } else {
      console.log(`${LOG_TAG} ${message}`);
    }
  }
}

function warn(message: string, error?: unknown) {
  console.warn(`${LOG_TAG} ⚠️  ${message}`, error ?? "");
}

function err(message: string, error?: unknown) {
  console.error(`${LOG_TAG} ❌  ${message}`, error ?? "");
}

// ─── Foreground notification handler ─────────────────────────────────────────
// Must be called at the module level (outside any component) so it runs
// even when the app is opened fresh from a notification tap.

Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    log("Foreground notification received:", {
      title: notification.request.content.title,
      body: notification.request.content.body,
      data: notification.request.content.data,
    });

    return {
      shouldShowBanner: true, // Show alert banner on iOS 14+
      shouldShowList: true, // Show in Notification Center list
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
  handleSuccess: (notificationId) => {
    log(`Notification handled successfully — id: ${notificationId}`);
  },
  handleError: (notificationId, error) => {
    err(`Notification handling failed — id: ${notificationId}`, error);
  },
});

// ─── Background task definition ───────────────────────────────────────────────
// Define the task at the module level so TaskManager can find it when the
// JS bundle is loaded headlessly (app terminated / backgrounded).

TaskManager.defineTask<Notifications.NotificationTaskPayload>(
  BACKGROUND_NOTIFICATION_TASK,
  ({ data, error }) => {
    if (error) {
      err("Background notification task error:", error);
      return;
    }

    log("Background notification task fired:", data);

    // Distinguish between a remote notification payload and a user response (tap)
    const isUserResponse = "actionIdentifier" in data;

    if (isUserResponse) {
      log("User interacted with notification in background:", {
        actionIdentifier: (data as Notifications.NotificationResponse)
          .actionIdentifier,
        title: (data as Notifications.NotificationResponse).notification.request
          .content.title,
      });
    } else {
      // Raw remote notification received while app is backgrounded/terminated
      log("Background data-only notification received:", {
        title: (data as Notifications.Notification).request.content.title,
        data: (data as Notifications.Notification).request.content.data,
      });
    }
  },
);

// ─── Android notification channels ───────────────────────────────────────────

async function setupAndroidChannels(): Promise<void> {
  if (Platform.OS !== "android") return;

  log("Setting up Android notification channels…");

  await Notifications.setNotificationChannelAsync("default", {
    name: "General",
    description: "General app notifications",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#208AEF",
    showBadge: true,
    sound: "default",
  });

  await Notifications.setNotificationChannelAsync("alerts", {
    name: "Alerts",
    description: "Important alerts and action items",
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 500, 200, 500],
    lightColor: "#FF6B6B",
    showBadge: true,
    sound: "default",
  });

  log("Android notification channels created: [default, alerts]");
}

// ─── Permission request ───────────────────────────────────────────────────────

export async function requestNotificationPermissions(): Promise<boolean> {
  log("Requesting notification permissions…");

  if (!Device.isDevice) {
    warn(
      "Push notifications only work on physical devices. Skipping permission request.",
    );
    return false;
  }

  // On Android 13+, we must create a channel BEFORE requesting permissions
  // so the system prompt appears.
  await setupAndroidChannels();

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  log(`Current permission status: ${existingStatus}`);

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    log("Permissions not yet granted — prompting user…");

    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowProvisional: false,
      },
    });

    finalStatus = status;
    log(`Permission response status: ${finalStatus}`);
  }

  if (finalStatus !== "granted") {
    warn(`Notification permissions denied (status: ${finalStatus})`);
    return false;
  }

  log("Notification permissions GRANTED ✅");
  return true;
}

// ─── Token registration ───────────────────────────────────────────────────────

export async function registerForPushNotificationsAsync(): Promise<
  string | null
> {
  log("Starting push notification registration…");

  const permissionGranted = await requestNotificationPermissions();
  if (!permissionGranted) {
    return null;
  }

  // Retrieve Expo projectId from app config (set automatically by EAS Build,
  // or manually via app.json extra.eas.projectId)
  const projectId: string | undefined =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;

  if (!projectId) {
    warn(
      "No EAS projectId found. " +
        'Add "extra": { "eas": { "projectId": "<your-id>" } } to app.json ' +
        "or run `eas build:configure`.",
    );
  }

  log(`Using EAS projectId: ${projectId ?? "(none — local/dev mode)"}`);

  try {
    // Expo push token — use this to send via Expo's push service
    const expoPushTokenData = await Notifications.getExpoPushTokenAsync(
      projectId ? { projectId } : {},
    );
    const expoPushToken = expoPushTokenData.data;
    log(`Expo push token obtained: ${expoPushToken}`);

    // Also log the raw device token for FCM/APNs direct use
    try {
      const deviceToken = await Notifications.getDevicePushTokenAsync();
      log(`Device push token (${deviceToken.type}): ${deviceToken.data}`);
    } catch (deviceTokenError) {
      warn("Could not fetch raw device push token:", deviceTokenError);
    }

    return expoPushToken;
  } catch (error) {
    err("Failed to get Expo push token:", error);
    return null;
  }
}

// ─── Background task registration ────────────────────────────────────────────

export async function registerBackgroundNotificationTask(): Promise<void> {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_NOTIFICATION_TASK,
    );

    if (isRegistered) {
      log(
        `Background task "${BACKGROUND_NOTIFICATION_TASK}" already registered.`,
      );
      return;
    }

    await Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
    log(`Background task "${BACKGROUND_NOTIFICATION_TASK}" registered ✅`);
  } catch (error) {
    err("Failed to register background notification task:", error);
  }
}

// ─── Utility: schedule a local notification ───────────────────────────────────

export async function scheduleLocalNotification(
  title: string,
  body: string,
  data?: Record<string, unknown>,
  delaySeconds = 0,
): Promise<string | null> {
  log(`Scheduling local notification in ${delaySeconds}s:`, {
    title,
    body,
    data,
  });

  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: data ?? {},
        sound: "default",
        badge: 1,
      },
      trigger:
        delaySeconds > 0
          ? {
              type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
              seconds: delaySeconds,
            }
          : null, // null = show immediately
    });
    log(`Local notification scheduled — id: ${id}`);
    return id;
  } catch (error) {
    err("Failed to schedule local notification:", error);
    return null;
  }
}

// ─── Utility: clear badge ─────────────────────────────────────────────────────

export async function clearBadge(): Promise<void> {
  try {
    await Notifications.setBadgeCountAsync(0);
    log("Badge count cleared.");
  } catch (error) {
    warn("Failed to clear badge:", error);
  }
}
