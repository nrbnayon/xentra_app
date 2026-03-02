/**
 * use-notifications.ts
 *
 * React hook that wires up the full push notification lifecycle:
 *  - Registers for push tokens on mount
 *  - Registers the background task
 *  - Listens for foreground notifications
 *  - Listens for notification taps (response)
 *  - Handles deep-link routing from notification data.url
 *  - Clears badge when app comes to foreground
 */

import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

import {
  clearBadge,
  registerBackgroundNotificationTask,
  registerForPushNotificationsAsync,
} from "@/services/notifications";

const LOG_TAG = "[useNotifications]";

function log(message: string, data?: unknown) {
  if (__DEV__) {
    if (data !== undefined) {
      console.log(`${LOG_TAG} ${message}`, JSON.stringify(data, null, 2));
    } else {
      console.log(`${LOG_TAG} ${message}`);
    }
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NotificationState {
  /** The Expo push token for this device, or null if not yet obtained */
  expoPushToken: string | null;
  /** The last notification received while the app was in the foreground */
  lastNotification: Notifications.Notification | null;
  /** The last interaction response (user tapped a notification) */
  lastResponse: Notifications.NotificationResponse | null;
  /** Whether push permission has been granted */
  permissionGranted: boolean;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useNotifications(): NotificationState {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [lastNotification, setLastNotification] =
    useState<Notifications.Notification | null>(null);
  const [lastResponse, setLastResponse] =
    useState<Notifications.NotificationResponse | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Stable refs for listeners so we can clean up properly
  const notificationListenerRef =
    useRef<Notifications.EventSubscription | null>(null);
  const responseListenerRef = useRef<Notifications.EventSubscription | null>(
    null,
  );
  const tokenListenerRef = useRef<Notifications.EventSubscription | null>(null);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  // ── Handle deep-link from a notification response ──────────────────────────
  function handleNotificationResponse(
    response: Notifications.NotificationResponse,
  ) {
    log("Notification tapped / response received:", {
      actionIdentifier: response.actionIdentifier,
      title: response.notification.request.content.title,
      data: response.notification.request.content.data,
    });

    setLastResponse(response);

    // If the notification payload includes a `url` field, navigate to it
    const url = response.notification.request.content.data?.url;
    if (typeof url === "string" && url.length > 0) {
      log(`Deep-linking to: ${url}`);
      router.push(url as never);
    }
  }

  useEffect(() => {
    let isMounted = true;
    log("Initialising push notification service…");

    // ── 1. Register for push token ───────────────────────────────────────────
    registerForPushNotificationsAsync().then((token) => {
      if (!isMounted) return;
      if (token) {
        log(`Push token stored in state: ${token}`);
        setExpoPushToken(token);
        setPermissionGranted(true);
      } else {
        setPermissionGranted(false);
      }
    });

    // ── 2. Register background task ──────────────────────────────────────────
    registerBackgroundNotificationTask();

    // ── 3. Foreground notification listener ──────────────────────────────────
    notificationListenerRef.current =
      Notifications.addNotificationReceivedListener((notification) => {
        log("Foreground notification event (listener):", {
          title: notification.request.content.title,
          body: notification.request.content.body,
          data: notification.request.content.data,
        });
        if (isMounted) setLastNotification(notification);
      });

    // ── 4. Notification response / tap listener ───────────────────────────────
    responseListenerRef.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        if (isMounted) handleNotificationResponse(response);
      });

    // ── 5. Push token rotation listener ──────────────────────────────────────
    // In rare cases the push-service rotates the token while the app is running
    tokenListenerRef.current = Notifications.addPushTokenListener(
      (newToken) => {
        log("Push token rotated — new token:", newToken);
        // TODO: re-register the new token with your backend here
      },
    );

    // ── 6. Handle notification that LAUNCHED the app ─────────────────────────
    // (user tapped a notification while app was terminated)
    const initialResponse = Notifications.getLastNotificationResponse();
    if (initialResponse) {
      log("App was launched via notification tap:", {
        title: initialResponse.notification.request.content.title,
        data: initialResponse.notification.request.content.data,
      });
      if (isMounted) handleNotificationResponse(initialResponse);
    }

    // ── 7. Clear badge when app comes to foreground ───────────────────────────
    const appStateSubscription = AppState.addEventListener(
      "change",
      (nextState: AppStateStatus) => {
        if (
          appStateRef.current.match(/inactive|background/) &&
          nextState === "active"
        ) {
          log("App came to foreground — clearing badge");
          clearBadge();
        }
        appStateRef.current = nextState;
      },
    );

    return () => {
      isMounted = false;
      log("Cleaning up notification listeners…");
      notificationListenerRef.current?.remove();
      responseListenerRef.current?.remove();
      tokenListenerRef.current?.remove();
      appStateSubscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { expoPushToken, lastNotification, lastResponse, permissionGranted };
}
