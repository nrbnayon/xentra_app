/**
 * language-select.tsx
 *
 * Shown once on first launch (before login).
 * Lets the user pick their preferred language, persists the choice, then
 * navigates to the login screen.
 *
 * Design: gradient background (#BEE3FF → #FFFFFF), globe icon, bordered
 * language cards, solid "Continue" button — matching the Xentra mockup.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ─── Constants ────────────────────────────────────────────────────────────────

export const LANGUAGE_SELECTED_KEY = "xentra_language_selected";

const LANGUAGES = [
  { code: "ht", name: "Haitian Kreyòl", flag: "🇭🇹" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
] as const;

type LangCode = (typeof LANGUAGES)[number]["code"];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function LanguageSelectScreen() {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<LangCode>("en");
  const [isContinuing, setIsContinuing] = useState(false);

  const handleContinue = async () => {
    if (isContinuing) return;
    setIsContinuing(true);
    try {
      // Mark that the user has completed language selection
      await AsyncStorage.setItem(LANGUAGE_SELECTED_KEY, selected);
    } catch (_) {
      // Non-critical — proceed anyway
    } finally {
      setIsContinuing(false);
      router.replace("/(auth)/login");
    }
  };

  return (
    <LinearGradient
      colors={["#BEE3FF", "#FFFFFF", "#FFFFFF"]}
      locations={[0, 0.238, 0.9525]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.45, y: 1 }}
      style={{ flex: 1 }}
    >
      <StatusBar style="auto" />

      <View
        style={[
          styles.container,
          { paddingTop: insets.top + 32, paddingBottom: insets.bottom + 24 },
        ]}
      >
        {/* ── Globe Icon ──────────────────────────────────────────────── */}
        <View style={styles.globeWrapper}>
          <Text style={styles.globeEmoji}>🌐</Text>
        </View>

        {/* ── Heading ─────────────────────────────────────────────────── */}
        <Text style={styles.title}>Select Language</Text>
        <Text style={styles.subtitle}>Choose your preferred language</Text>

        {/* ── Language Cards ───────────────────────────────────────────── */}
        <View style={styles.listWrapper}>
          {LANGUAGES.map((lang) => {
            const isSelected = selected === lang.code;
            return (
              <Pressable
                key={lang.code}
                onPress={() => setSelected(lang.code)}
                style={({ pressed }) => [
                  styles.card,
                  isSelected && styles.cardSelected,
                  pressed && !isSelected && styles.cardPressed,
                ]}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                accessibilityLabel={lang.name}
              >
                <Text style={styles.flag}>{lang.flag}</Text>
                <Text
                  style={[
                    styles.langName,
                    isSelected && styles.langNameSelected,
                  ]}
                >
                  {lang.name}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* ── Spacer ──────────────────────────────────────────────────── */}
        <View style={{ flex: 1 }} />

        {/* ── Continue Button ─────────────────────────────────────────── */}
        <Pressable
          onPress={handleContinue}
          disabled={isContinuing}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            isContinuing && styles.buttonDisabled,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Continue"
        >
          {isContinuing ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </Pressable>
      </View>
    </LinearGradient>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const BRAND = "#1D3F6E"; // deep navy — matches design heading colour
const BORDER_SELECTED = "#1D3F6E";
const BORDER_DEFAULT = "#E4E8EF";
const BTN_BG = "#1D3F6E";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
  },

  // Globe
  globeWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: BRAND,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  globeEmoji: {
    fontSize: 34,
  },

  // Headings
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: BRAND,
    marginBottom: 6,
    fontFamily: "Inter_700Bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7A8D",
    marginBottom: 36,
    fontFamily: "Inter_400Regular",
  },

  // Cards
  listWrapper: {
    width: "100%",
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: BORDER_DEFAULT,
    paddingVertical: 16,
    paddingHorizontal: 18,
    gap: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardSelected: {
    borderColor: BORDER_SELECTED,
    borderWidth: 2,
    backgroundColor: "#F0F5FF",
  },
  cardPressed: {
    backgroundColor: "#F7F9FC",
  },
  flag: {
    fontSize: 28,
    lineHeight: 34,
  },
  langName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A1A2E",
    fontFamily: "Inter_500Medium",
  },
  langNameSelected: {
    color: BRAND,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },

  // Button
  button: {
    width: "100%",
    height: 54,
    borderRadius: 14,
    backgroundColor: BTN_BG,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: BTN_BG,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  buttonPressed: {
    opacity: 0.88,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.3,
  },
});
