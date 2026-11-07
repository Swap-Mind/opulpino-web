"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { LANGS, type L, type Lang } from "./texts";

export * from "./texts";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (v: L | string) => string };
const LangContext = createContext<Ctx>({ lang: "es", setLang: () => {}, t: (v) => (typeof v === "string" ? v : v.es) });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved && LANGS.includes(saved)) setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  }, []);

  const t = useCallback((v: L | string) => (typeof v === "string" ? v : v[lang] || v.es), [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
