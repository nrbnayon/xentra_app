/**
 * _layout.tsx  (root layout)
 *
 * Wraps the entire app in:
 *  1. LanguageProvider  — global translation context (default: English)
 *  2. ThemeProvider     — react-navigation theming
 *  3. AnimatedSplashOverlay + AppTabs — app UI
 *  4. NotificationBootstrap — push notification setup
 */

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts as useInterFonts,
} from "@expo-google-fonts/inter";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts as useRobotoFonts,
} from "@expo-google-fonts/roboto";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import "../../global.css";

import { AnimatedSplashOverlay } from "@/components/ui/animated-icon";
import { LanguageProvider } from "@/context/LanguageContext";
import { useNotifications } from "@/hooks/use-notifications";
import { Toast } from "@/components/ui/Toast";

// Prevent auto-hiding the splash screen while fonts are loading
SplashScreen.preventAutoHideAsync();

// ─── Notification bootstrap (side-effect only) ────────────────────────────────
function NotificationBootstrap() {
  const { expoPushToken, permissionGranted } = useNotifications();

  if (__DEV__) {
    console.log("[_layout] Notification bootstrap:", {
      permissionGranted,
      expoPushToken: expoPushToken ? `${expoPushToken.slice(0, 30)}…` : null,
    });
  }

  return null;
}

// ─── Root layout ──────────────────────────────────────────────────────────────
export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [interLoaded, interError] = useInterFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [robotoLoaded, robotoError] = useRobotoFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  useEffect(() => {
    if ((interLoaded && robotoLoaded) || interError || robotoError) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, robotoLoaded, interError, robotoError]);

  if (!interLoaded || !robotoLoaded) {
    return null;
  }

  return (
    <LanguageProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(public)" options={{ headerShown: false }} />
        </Stack>
        <Toast />
        {/* Mount after AppTabs so expo-router is ready for deep-links */}
        <NotificationBootstrap />
      </ThemeProvider>
    </LanguageProvider>
  );
}
