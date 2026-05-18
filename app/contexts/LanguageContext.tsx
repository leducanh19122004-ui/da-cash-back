'use client';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Lang, Translations, translations } from '../translations';

interface LangContextType {
  lang: Lang;
  t: Translations;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextType>({
  lang: 'vi',
  t: translations.vi,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('vi');
  const setLang = useCallback((l: Lang) => setLangState(l), []);
  return (
    <LangContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
