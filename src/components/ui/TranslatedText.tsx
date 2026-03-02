/**
 * TranslatedText.tsx
 *
 * Drop-in replacement for React Native's <Text> that auto-translates
 * its string children to the current app language.
 *
 * Zero-flicker design:
 *  - Renders original text immediately (no blank/loading state)
 *  - If a cached translation exists it's shown on the first render
 *  - When the background fetch completes the context ticks, causing
 *    this component to re-render with the translated value — no delay
 *  - No setTimeout, no double useEffect, no spinner
 *
 * @example
 * // Simple usage — exactly like <Text>
 * <TranslatedText style={styles.title}>Hello World</TranslatedText>
 *
 * // Skip translation for dynamic data that's already translated
 * <TranslatedText skip>{"Dynamically translated string"}</TranslatedText>
 */

import { useLanguage } from "@/context/LanguageContext";
import React from "react";
import { Text, type TextProps } from "react-native";

// ─── Props ────────────────────────────────────────────────────────────────────

interface TranslatedTextProps extends TextProps {
  /** The English source string to translate. Must be a plain string. */
  children: string;

  /** If true, renders children as-is without any translation attempt. */
  skip?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const TranslatedText = React.memo<TranslatedTextProps>(
  ({ children, skip = false, ...textProps }) => {
    const { translate } = useLanguage();

    // translate() is sync: returns cached value or kicks off background fetch.
    // When the fetch resolves, the context tick re-renders this component.
    const displayText =
      skip || typeof children !== "string" ? children : translate(children);

    return <Text {...textProps}>{displayText}</Text>;
  },
);

TranslatedText.displayName = "TranslatedText";
