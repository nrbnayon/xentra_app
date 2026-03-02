/**
 * useTranslation.ts
 *
 * Convenience re-export of the language context hook.
 * Use this anywhere in the app — it replaces the old useTranslation hook
 * and is fully compatible with it (same API surface, no breaking changes).
 *
 * @example
 * const { t, changeLanguage, language } = useTranslation();
 * const label = t('Submit');           // sync, instant if cached
 * const full  = await tAsync('Hello'); // async, always resolves
 */

import { useLanguage } from "@/context/LanguageContext";

export function useTranslation() {
  const ctx = useLanguage();

  return {
    /** Sync translation — returns cached value or original text instantly */
    t: ctx.translate,

    /** Async translation — always resolves to the translated string */
    tAsync: ctx.translateAsync,

    /** Batch translate multiple strings with a single API call */
    tBatch: ctx.translateBatch,

    /** Change the app language globally */
    changeLanguage: ctx.changeLanguage,

    /** Current language code e.g. "en", "fr" */
    language: ctx.language,

    /** Full Language object with name, nativeName, rtl */
    currentLanguage: ctx.currentLanguage,

    /** Full list of all supported languages */
    supportedLanguages: ctx.supportedLanguages,

    /** True while a language switch is in progress */
    isChanging: ctx.isChanging,

    /** True once AsyncStorage has been read on first boot */
    isReady: ctx.isReady,

    // ── Legacy aliases (for backward compatibility) ──────────────────────────
    /** @deprecated Use `t` instead */
    translateAsync: ctx.translateAsync,
    /** @deprecated Use `tBatch` instead */
    translateBatch: ctx.translateBatch,
    /** @deprecated Use `isChanging` instead */
    isTranslating: ctx.isChanging,
    /** @deprecated Use `language` instead */
    currentLanguageCode: ctx.language,
  };
}
