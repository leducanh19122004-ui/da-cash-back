'use client';
import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Lang, Translations, translations } from '../translations';
import { UiStrings, uiStrings } from '../translations/ui';

interface LangContextType {
  lang: Lang;
  t: Translations;
  ui: UiStrings;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  t: translations.en,
  ui: uiStrings.en,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');
  const setLang = useCallback((l: Lang) => setLangState(l), []);

  // Keep <html lang> in sync: screen readers and the per-script font rules
  // in globals.css (Vietnamese, Thai, Korean) depend on it.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], ui: uiStrings[lang], setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
