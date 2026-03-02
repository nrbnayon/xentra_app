/**
 * translationService.ts
 *
 * Low-level Google Translate API wrapper.
 * Responsibilities:
 *  - In-memory cache (runtime, instant lookups)
 *  - AsyncStorage cache (persisted, 7-day TTL)
 *  - Batch translation to minimise API calls
 *  - Request deduplication (no double-firing for same text)
 *  - Full debug logging in __DEV__ mode
 *  - Always falls back to original text on any error
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

// ─── Config ───────────────────────────────────────────────────────────────────

const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_TRANSLATE_API_KEY ?? "";
const API_URL = "https://translation.googleapis.com/language/translate/v2";
const STORAGE_KEY = "xentra_translation_cache_v2";
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const LOG = "[TranslationService]";

function log(msg: string, data?: unknown) {
  if (__DEV__) {
    data !== undefined
      ? console.log(`${LOG} ${msg}`, data)
      : console.log(`${LOG} ${msg}`);
  }
}

function warn(msg: string, err?: unknown) {
  console.warn(`${LOG} ⚠️ ${msg}`, err ?? "");
}

// ─── Types ────────────────────────────────────────────────────────────────────

/** storageCache[lang][normalizedText] = translatedText */
type StorageCache = Record<string, Record<string, string>>;

interface PersistedStore {
  cache: StorageCache;
  expiresAt: number;
}

// ─── Service ─────────────────────────────────────────────────────────────────

class TranslationService {
  /** Runtime in-memory mirror of the persisted cache */
  private mem: StorageCache = {};

  /** True once AsyncStorage has been read for the first time */
  private hydrated = false;
  private hydratePromise: Promise<void> | null = null;

  /** In-flight network requests, keyed by `lang:text` to prevent duplicates */
  private inflight = new Map<string, Promise<string>>();

  // ── Hydration ──────────────────────────────────────────────────────────────

  /** Call once at app startup; subsequent calls are no-ops. */
  async hydrate(): Promise<void> {
    if (this.hydrated) return;
    if (this.hydratePromise) return this.hydratePromise;

    this.hydratePromise = (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) return;

        const stored: PersistedStore = JSON.parse(raw);
        if (Date.now() < stored.expiresAt) {
          this.mem = stored.cache;
          const count = Object.values(this.mem).reduce(
            (acc, langMap) => acc + Object.keys(langMap).length,
            0,
          );
          log(`Cache hydrated — ${count} entries loaded from AsyncStorage.`);
        } else {
          log("Persisted cache expired — starting fresh.");
          await AsyncStorage.removeItem(STORAGE_KEY);
        }
      } catch (e) {
        warn("Failed to hydrate cache from AsyncStorage:", e);
      } finally {
        this.hydrated = true;
      }
    })();

    return this.hydratePromise;
  }

  // ── Memory cache helpers ───────────────────────────────────────────────────

  private memGet(lang: string, text: string): string | undefined {
    return this.mem[lang]?.[text.toLowerCase()];
  }

  private memSet(lang: string, text: string, translation: string): void {
    if (!this.mem[lang]) this.mem[lang] = {};
    this.mem[lang][text.toLowerCase()] = translation;
  }

  // ── Persist ────────────────────────────────────────────────────────────────

  private persistDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  /** Write mem cache to AsyncStorage, debounced to batch multiple writes. */
  private schedulePersist(): void {
    if (this.persistDebounceTimer) clearTimeout(this.persistDebounceTimer);
    this.persistDebounceTimer = setTimeout(() => this.persist(), 2000);
  }

  private async persist(): Promise<void> {
    try {
      const store: PersistedStore = {
        cache: this.mem,
        expiresAt: Date.now() + CACHE_TTL_MS,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      log("Cache persisted to AsyncStorage.");
    } catch (e) {
      warn("Failed to persist cache:", e);
    }
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  /**
   * Translate a single string.
   * Returns the original text instantly if:
   *  - targetLang === 'en'
   *  - text is already cached
   *  - any network/API error occurs
   */
  async translate(text: string, targetLang: string): Promise<string> {
    if (!text.trim() || targetLang === "en") return text;

    await this.hydrate();

    const cached = this.memGet(targetLang, text);
    if (cached !== undefined) {
      log(`Cache hit [${targetLang}]: "${text.slice(0, 40)}"`);
      return cached;
    }

    const inflightKey = `${targetLang}:${text}`;
    const existing = this.inflight.get(inflightKey);
    if (existing) {
      log(`Dedup — waiting for in-flight request: "${text.slice(0, 40)}"`);
      return existing;
    }

    const request = this.fetchSingle(text, targetLang).finally(() => {
      this.inflight.delete(inflightKey);
    });

    this.inflight.set(inflightKey, request);
    return request;
  }

  /**
   * Translate multiple strings in a single API call.
   * Cache hits are served immediately; only misses hit the network.
   */
  async translateBatch(texts: string[], targetLang: string): Promise<string[]> {
    if (targetLang === "en") return texts;

    await this.hydrate();

    const results: string[] = new Array(texts.length);
    const misses: { text: string; idx: number }[] = [];

    for (let i = 0; i < texts.length; i++) {
      const text = texts[i];
      if (!text?.trim()) {
        results[i] = text;
        continue;
      }
      const cached = this.memGet(targetLang, text);
      if (cached !== undefined) {
        results[i] = cached;
      } else {
        misses.push({ text, idx: i });
      }
    }

    if (misses.length === 0) {
      log(
        `Batch: all ${texts.length} strings served from cache [${targetLang}]`,
      );
      return results;
    }

    log(`Batch: ${misses.length} misses → API call [${targetLang}]`);

    try {
      const translations = await this.fetchBatch(
        misses.map((m) => m.text),
        targetLang,
      );

      for (let i = 0; i < misses.length; i++) {
        const translated = translations[i] ?? misses[i].text;
        results[misses[i].idx] = translated;
        this.memSet(targetLang, misses[i].text, translated);
      }

      this.schedulePersist();
    } catch (e) {
      warn("Batch translation failed — falling back to originals:", e);
      for (const { text, idx } of misses) results[idx] = text;
    }

    return results;
  }

  /** Returns the cached translation synchronously, or undefined if not cached. */
  getCached(text: string, targetLang: string): string | undefined {
    if (targetLang === "en") return text;
    return this.memGet(targetLang, text);
  }

  /** Wipe in-memory and persisted caches. Call when user switches language. */
  async clearCache(): Promise<void> {
    this.mem = {};
    await AsyncStorage.removeItem(STORAGE_KEY);
    log("Cache cleared.");
  }

  // ── Private fetch helpers ──────────────────────────────────────────────────

  private async fetchSingle(text: string, targetLang: string): Promise<string> {
    log(`API call (single) [${targetLang}]: "${text.slice(0, 60)}"`);
    try {
      const res = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          source: "en",
          target: targetLang,
          format: "text",
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      const translated: string = json.data.translations[0].translatedText;

      log(`API result [${targetLang}]: "${translated.slice(0, 60)}"`);
      this.memSet(targetLang, text, translated);
      this.schedulePersist();

      return translated;
    } catch (e) {
      warn(`API error for "${text.slice(0, 40)}":`, e);
      return text;
    }
  }

  private async fetchBatch(
    texts: string[],
    targetLang: string,
  ): Promise<string[]> {
    const res = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: texts,
        source: "en",
        target: targetLang,
        format: "text",
      }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    return json.data.translations.map(
      (t: { translatedText: string }) => t.translatedText,
    );
  }
}

export const translationService = new TranslationService();
