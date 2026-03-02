/**
 * LanguageContext.tsx
 *
 * Single global source of truth for the app's language.
 *
 * Features:
 *  - Persists chosen language in AsyncStorage
 *  - Hydrates translationService cache on startup
 *  - Provides `changeLanguage()` that instantly updates every subscriber
 *  - `translate(text)` returns cached string synchronously when available,
 *    kicks off async fetch otherwise (zero flicker pattern)
 *  - Full debug logging in __DEV__ mode
 */

import { translationService } from "@/services/translationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// ─── Config ───────────────────────────────────────────────────────────────────

const LANG_STORAGE_KEY = "xentra_language";
const DEFAULT_LANGUAGE = "en";

const LOG = "[LanguageContext]";

function log(msg: string, data?: unknown) {
  if (__DEV__) {
    data !== undefined
      ? console.log(`${LOG} ${msg}`, data)
      : console.log(`${LOG} ${msg}`);
  }
}

// ─── Supported Languages ─────────────────────────────────────────────────────

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  rtl?: boolean;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "ar", name: "Arabic", nativeName: "العربية", rtl: true },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "zh", name: "Chinese (Simplified)", nativeName: "中文" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu" },
  { code: "fa", name: "Persian", nativeName: "فارسی", rtl: true },
  { code: "pl", name: "Polish", nativeName: "Polski" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili" },
  { code: "tl", name: "Tagalog", nativeName: "Tagalog" },
  { code: "th", name: "Thai", nativeName: "ภาษาไทย" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська" },
  { code: "ur", name: "Urdu", nativeName: "اردو", rtl: true },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt" },
];

// ─── Context type ─────────────────────────────────────────────────────────────

export interface LanguageContextValue {
  /** Current ISO 639-1 language code, e.g. "en", "ar", "bn" */
  language: string;

  /** Whether the service has finished reading AsyncStorage on first boot */
  isReady: boolean;

  /** Whether a language change + preload is currently in progress */
  isChanging: boolean;

  /** The full Language object for the current language */
  currentLanguage: Language;

  /** Full list of supported languages */
  supportedLanguages: Language[];

  /**
   * Synchronous lookup — returns cached translation instantly,
   * or the source text if not yet cached (triggers background fetch).
   * Use this inside render for zero-flicker when cache is warm.
   */
  translate: (text: string) => string;

  /**
   * Asynchronous translation — awaits the API if needed.
   * Use this in event handlers or `useEffect` when you need
   * the translated value before rendering.
   */
  translateAsync: (text: string) => Promise<string>;

  /**
   * Translate multiple strings with a single API call.
   * Cache hits are served instantly; only misses go to the network.
   */
  translateBatch: (texts: string[]) => Promise<string[]>;

  /** Change app language. Clears old cache, fetches common strings, updates listeners. */
  changeLanguage: (code: string) => Promise<void>;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const LanguageContext = createContext<LanguageContextValue | null>(null);

// ─── Re-render trigger ────────────────────────────────────────────────────────
// When a background translation resolves, we need to re-render subscribers.
// We use a simple tick counter stored in context state for this.

// ─── Provider ─────────────────────────────────────────────────────────────────

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [isReady, setIsReady] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  /** Incrementing to force re-renders when new translations arrive */
  const [, setTick] = useState(0);

  const rerender = useCallback(() => setTick((n) => n + 1), []);

  // ── On mount: load persisted language + hydrate cache ─────────────────────
  useEffect(() => {
    (async () => {
      log("Initialising…");

      // Hydrate translation cache from AsyncStorage first (no-op if fresh)
      await translationService.hydrate();

      // Then restore persisted language choice
      try {
        const saved = await AsyncStorage.getItem(LANG_STORAGE_KEY);
        if (saved && saved !== DEFAULT_LANGUAGE) {
          log(`Restoring saved language: ${saved}`);
          setLanguage(saved);
        }
      } catch (e) {
        log("Could not read saved language:", e);
      }

      setIsReady(true);
      log("Ready ✅");
    })();
  }, []);

  // ── translate (sync) ──────────────────────────────────────────────────────
  const translate = useCallback(
    (text: string): string => {
      if (!text?.trim() || language === "en") return text;

      const cached = translationService.getCached(text, language);
      if (cached !== undefined) return cached;

      // Not in cache — kick off background fetch, then trigger re-render
      translationService
        .translate(text, language)
        .then(() => rerender())
        .catch(() => {
          /* silently fall back */
        });

      return text; // return original immediately — zero flicker
    },
    [language, rerender],
  );

  // ── translateAsync ────────────────────────────────────────────────────────
  const translateAsync = useCallback(
    (text: string): Promise<string> => {
      if (!text?.trim() || language === "en") return Promise.resolve(text);
      return translationService.translate(text, language);
    },
    [language],
  );

  // ── translateBatch ────────────────────────────────────────────────────────
  const translateBatch = useCallback(
    (texts: string[]): Promise<string[]> => {
      if (language === "en") return Promise.resolve(texts);
      return translationService.translateBatch(texts, language);
    },
    [language],
  );

  // ── changeLanguage ────────────────────────────────────────────────────────
  const changeLanguage = useCallback(
    async (code: string): Promise<void> => {
      if (code === language) return;
      log(`Changing language: ${language} → ${code}`);

      setIsChanging(true);

      try {
        // Clear old cache so stale translations don't linger
        await translationService.clearCache();

        // Persist choice
        await AsyncStorage.setItem(LANG_STORAGE_KEY, code);

        // Update state — every subscriber re-renders instantly
        setLanguage(code);

        // Pre-warm cache with common UI strings in background
        if (code !== "en") {
          const common = [
            "Welcome",
            "Loading",
            "Error",
            "Success",
            "Cancel",
            "Confirm",
            "Continue",
            "Back",
            "Save",
            "Done",
            "Settings",
            "Profile",
            "Logout",
            "Search",
            "Home",
          ];
          translationService
            .translateBatch(common, code)
            .then(() => {
              log(`Pre-warm complete for [${code}]`);
              rerender();
            })
            .catch(() => {
              /* ignore — non-critical */
            });
        }

        log(`Language changed to: ${code} ✅`);
      } catch (e) {
        log("changeLanguage error:", e);
      } finally {
        setIsChanging(false);
      }
    },
    [language, rerender],
  );

  const currentLanguage =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) ??
    SUPPORTED_LANGUAGES[0];

  const value: LanguageContextValue = {
    language,
    isReady,
    isChanging,
    currentLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    translate,
    translateAsync,
    translateBatch,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useLanguage — access the full language context.
 *
 * @example
 * const { translate, changeLanguage, language } = useLanguage();
 * const label = translate('Hello World');
 */
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return ctx;
}
