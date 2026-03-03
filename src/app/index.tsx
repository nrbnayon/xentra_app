/**
 * index.tsx  (root entry point)
 *
 * Route priority:
 *  1. Fonts not yet ready → render nothing (splash visible)
 *  2. Authenticated        → /(protected)
 *  3. Never chosen lang    → /(public)/language-select   (first launch)
 *  4. Otherwise            → /(auth)/login
 */

import { useAuthStore } from "@/store/useAuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { LANGUAGE_SELECTED_KEY } from "./(public)/language-select";

export default function Index() {
  const { isAuthenticated } = useAuthStore();
  const [langChecked, setLangChecked] = useState(false);
  const [hasLanguage, setHasLanguage] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(LANGUAGE_SELECTED_KEY)
      .then((val) => setHasLanguage(!!val))
      .catch(() => setHasLanguage(false))
      .finally(() => setLangChecked(true));
  }, []);

  // Wait for AsyncStorage check before redirecting
  if (!langChecked) return null;

  if (isAuthenticated) return <Redirect href="/(protected)" />;
  if (!hasLanguage) return <Redirect href="/(public)/language-select" />;
  return <Redirect href="/(auth)/login" />;
}
