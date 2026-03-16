export interface LanguageInfo {
  code: string;
  name: string;
  nativeName: string;
  /** construct.net URL prefix, e.g. "en" or "es" */
  urlPrefix: string;
}

export const LANGUAGES: Record<string, LanguageInfo> = {
  en: { code: "en", name: "English", nativeName: "English", urlPrefix: "en" },
  es: { code: "es", name: "Spanish", nativeName: "Español", urlPrefix: "es" },
  "pt-br": {
    code: "pt-br",
    name: "Portuguese (Brazil)",
    nativeName: "Português (Brasil)",
    urlPrefix: "pt-br",
  },
  fr: { code: "fr", name: "French", nativeName: "Français", urlPrefix: "fr" },
  de: { code: "de", name: "German", nativeName: "Deutsch", urlPrefix: "de" },
  it: { code: "it", name: "Italian", nativeName: "Italiano", urlPrefix: "it" },
  ja: { code: "ja", name: "Japanese", nativeName: "日本語", urlPrefix: "ja" },
  ko: { code: "ko", name: "Korean", nativeName: "한국어", urlPrefix: "ko" },
  zh: { code: "zh", name: "Chinese", nativeName: "中文", urlPrefix: "zh" },
  ru: { code: "ru", name: "Russian", nativeName: "Русский", urlPrefix: "ru" },
  tr: { code: "tr", name: "Turkish", nativeName: "Türkçe", urlPrefix: "tr" },
};

export const DEFAULT_LANG = "en";

export function isValidLang(lang: string): boolean {
  return lang in LANGUAGES;
}

export function getLangOrDefault(lang?: string): string {
  if (lang && isValidLang(lang)) return lang;
  return DEFAULT_LANG;
}
