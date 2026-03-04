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
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavLightTheme,
  ThemeProvider as NavThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";

import { AnimatedSplashOverlay } from "@/components/ui/animated-icon";
import { Toast } from "@/components/ui/Toast";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider, useAppTheme } from "@/context/ThemeContext";

SplashScreen.preventAutoHideAsync();

function MainLayout() {
  const { theme } = useAppTheme();
  const navTheme = theme === "dark" ? NavDarkTheme : NavLightTheme;

  return (
    <NavThemeProvider value={navTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(public)" options={{ headerShown: false }} />
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      </Stack>
      <Toast />
      <StatusBar style="auto" />
    </NavThemeProvider>
  );
}

// ─── Root layout ──────────────────────────────────────────────────────────────
export default function RootLayout() {
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
    <SafeAreaProvider>
      <LanguageProvider>
        <ThemeProvider>
          <MainLayout />
        </ThemeProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
