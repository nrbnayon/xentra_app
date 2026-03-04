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
  /** The English source string(s) to translate. Supports ReactNode array as well. */
  children: React.ReactNode;

  /** If true, renders children as-is without any translation attempt. */
  skip?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const TranslatedText = React.memo<TranslatedTextProps>(
  ({ children, skip = false, ...textProps }) => {
    const { translate, tick } = useLanguage();

    // Safely translate strings or string arrays, ignores React nodes
    const displayText = React.useMemo(() => {
      if (skip || !children) return children;

      if (typeof children === "string") {
        return translate(children);
      }

      if (Array.isArray(children)) {
        return children.map((child, index) => {
          if (typeof child === "string") {
            // translate returns string. React arrays like text mixed with vars are joined natively
            return (
              <React.Fragment key={index}>{translate(child)}</React.Fragment>
            );
          }
          return <React.Fragment key={index}>{child}</React.Fragment>;
        });
      }

      return children;
    }, [children, skip, translate, tick]);

    return <Text {...textProps}>{displayText}</Text>;
  },
);

TranslatedText.displayName = "TranslatedText";
