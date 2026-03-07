/**
 * language-select.tsx
 *
 * Exact implementation of the Language Selection screen matching the design mockup.
 * Uses NativeWind (Tailwind CSS) for styling compatible with iOS and Android.
 */

import { TranslatedText } from "@/components/ui/TranslatedText";
import { useLanguage } from "@/context/LanguageContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Globe } from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ─── Constants ────────────────────────────────────────────────────────────────
export const LANGUAGE_SELECTED_KEY = "xentra_language_selected";

const LANGUAGES = [
  {
    code: "ht",
    name: "Haitian Kreyòl",
    flag: "https://flagcdn.com/w80/ht.png",
  },
  {
    code: "en",
    name: "English",
    flag: "https://flagcdn.com/w80/us.png",
  },
  {
    code: "fr",
    name: "French",
    flag: "https://flagcdn.com/w80/fr.png",
  },
] as const;

type LangCode = (typeof LANGUAGES)[number]["code"];

export default function LanguageSelectScreen() {
  const insets = useSafeAreaInsets();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [selected, setSelected] = useState<LangCode>(
    (currentLanguage.code as LangCode) || "en",
  );
  const [isContinuing, setIsContinuing] = useState(false);

  const handleContinue = async () => {
    if (isContinuing) return;
    setIsContinuing(true);
    try {
      // 1. Update the global app language
      await changeLanguage(selected);
      // 2. Persist the fact that we've chosen a language
      await AsyncStorage.setItem(LANGUAGE_SELECTED_KEY, selected);
    } catch (_) {
      // Non-critical — proceed anyway
    } finally {
      setIsContinuing(false);
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/(auth)/login");
      }
    }
  };

  return (
    <LinearGradient
      colors={["#BEE3FF", "#FFFFFF", "#FFFFFF"]}
      locations={[0, 0.238, 0.9525]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.45, y: 1 }}
      className="flex-1"
    >
      <StatusBar style="auto" />

      <View
        className="flex-1 px-7"
        style={{
          paddingTop: insets.top + 60,
          paddingBottom: insets.bottom + 30,
        }}
      >
        {/* ── Globe Icon ──────────────────────────────────────────────── */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-full bg-primary items-center justify-center shadow-lg transform active:scale-95 transition-transform">
            <Globe size={42} color="white" />
          </View>
        </View>

        {/* ── Heading ─────────────────────────────────────────────────── */}
        <View className="items-center mb-12">
          <TranslatedText className="text-[28px] font-bold text-primary mb-2 text-center leading-tight">
            Select Language
          </TranslatedText>
          <TranslatedText className="text-base font-medium text-secondary text-center opacity-80">
            Choose your preferred language
          </TranslatedText>
        </View>

        {/* ── Language Cards ───────────────────────────────────────────── */}
        <View className="gap-5">
          {LANGUAGES.map((lang) => {
            const isSelected = selected === lang.code;
            return (
              <Pressable
                key={lang.code}
                onPress={() => setSelected(lang.code)}
                className={`flex-row items-center px-6 py-4 bg-white rounded-lg ${
                  isSelected
                    ? "border-2 border-primary bg-primary/5"
                    : "border border-border"
                } shadow-sm active:opacity-70`}
              >
                <View className="w-12 h-8 rounded-sm overflow-hidden border border-[#E0E0E0] mr-5 shadow-sm bg-white">
                  <Image
                    source={{ uri: lang.flag }}
                    className="w-full h-full"
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                </View>
                <Text
                  className={`text-base ${
                    isSelected
                      ? "font-bold text-primary"
                      : "font-semibold text-foreground"
                  }`}
                >
                  {lang.name}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* ── Spacer ──────────────────────────────────────────────────── */}
        <View className="flex-1" />

        {/* ── Continue Button ─────────────────────────────────────────── */}
        <Pressable
          onPress={handleContinue}
          disabled={isContinuing}
          className={`w-full h-[58px] bg-primary rounded-xl justify-center items-center shadow-lg ${
            isContinuing ? "opacity-70" : "active:bg-primary/90"
          }`}
        >
          <TranslatedText className="text-white font-bold text-lg tracking-wide">
            {isContinuing ? "Processing..." : "Continue"}
          </TranslatedText>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
