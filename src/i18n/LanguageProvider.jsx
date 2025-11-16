import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from './translations.js';

const DEFAULT_LANGUAGE = 'tr';
const SUPPORTED_LANGUAGES = ['tr', 'en', 'nl'];

const LanguageContext = createContext({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  locale: 'tr-TR',
  t: (key) => key
});

const resolveTranslation = (language, key) => {
  const segments = key.split('.');
  return segments.reduce((acc, segment) => (acc && acc[segment] !== undefined ? acc[segment] : undefined), translations[language]);
};

const interpolate = (text, values = {}) => {
  if (typeof text !== 'string') {
    return text;
  }
  return Object.entries(values).reduce((acc, [placeholder, value]) => {
    const token = `{{${placeholder}}}`;
    return acc.split(token).join(String(value));
  }, text);
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_LANGUAGE;
    }
    const stored = window.localStorage.getItem('stoktakip-language');
    return SUPPORTED_LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('stoktakip-language', language);
      window.dispatchEvent(
        new CustomEvent('stoktakip-language-change', {
          detail: { language }
        })
      );
    }
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', language);
    }
  }, [language]);

  const setLanguage = useCallback((nextLanguage) => {
    if (SUPPORTED_LANGUAGES.includes(nextLanguage)) {
      setLanguageState(nextLanguage);
    }
  }, []);

  const locale = useMemo(() => {
    switch (language) {
      case 'en':
        return 'en-US';
      case 'nl':
        return 'nl-NL';
      default:
        return 'tr-TR';
    }
  }, [language]);

  const t = useCallback(
    (key, options) => {
      if (!key) {
        return '';
      }
      const primary = resolveTranslation(language, key);
      const fallback = language === DEFAULT_LANGUAGE ? undefined : resolveTranslation(DEFAULT_LANGUAGE, key);
      const value = primary !== undefined ? primary : fallback !== undefined ? fallback : key;
      if (typeof value === 'string') {
        return interpolate(value, options?.values);
      }
      return value;
    },
    [language]
  );

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      locale,
      t
    }),
    [language, setLanguage, locale, t]
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);

export const useTranslation = () => {
  const { t, language, setLanguage, locale } = useLanguage();
  return { t, language, setLanguage, locale };
};
