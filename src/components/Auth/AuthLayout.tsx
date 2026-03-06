import { BackButton } from "@/components/ui/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TranslatedText } from "../ui/TranslatedText";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  scrollable?: boolean;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  showBackButton = true,
  onBack,
  scrollable = true,
}: AuthLayoutProps) {
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const innerContent = (
    <View className="flex-1 px-5" style={{ paddingBottom: insets.bottom + 16 }}>
      {/* Back Button Row — always reserves space at the top */}
      <View
        className="flex-row items-center"
        style={{ paddingTop: insets.top + 12, marginBottom: 0 }}
      >
        {showBackButton ? (
          <BackButton onPress={handleBack} />
        ) : (
          /* invisible spacer so layout stays consistent */
          <View className="w-9 h-9" />
        )}
      </View>

      {/* Vertically-centred content area */}
      <View className="flex-1 justify-center w-full max-w-md self-center">
        {/* Title / Subtitle */}
        {(title || subtitle) && (
          <View className="items-center gap-2 mb-10">
            {title ? (
              <TranslatedText className="text-4xl font-bold text-primary text-center leading-10">
                {title}
              </TranslatedText>
            ) : null}
            {subtitle ? (
              <TranslatedText className="text-base text-secondary text-center leading-5 px-2">
                {subtitle}
              </TranslatedText>
            ) : null}
          </View>
        )}

        {/* Page-specific content */}
        {children}
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#BEE3FF", "#FFFFFF", "#FFFFFF"]}
      locations={[0, 0.238, 0.9525]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.45, y: 1 }}
      className="flex-1"
    >
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {scrollable ? (
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              {innerContent}
            </ScrollView>
          ) : (
            innerContent
          )}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
