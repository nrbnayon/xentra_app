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
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import React from "react";
import { useColorScheme } from "react-native";
import "../../global.css";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";
import { LanguageProvider } from "@/context/LanguageContext";
import { useNotifications } from "@/hooks/use-notifications";

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

  return (
    <LanguageProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <AppTabs />
        {/* Mount after AppTabs so expo-router is ready for deep-links */}
        <NotificationBootstrap />
      </ThemeProvider>
    </LanguageProvider>
  );
}
