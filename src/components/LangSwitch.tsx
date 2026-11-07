"use client";

import { motion } from "framer-motion";
import { LANGS, LANG_LABEL, useLang } from "@/lib/i18n";

export default function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      role="radiogroup"
      aria-label="Idioma / Language / Lingua"
      className={`flex items-center rounded-full border border-tiza/15 bg-pizarra/40 p-0.5 backdrop-blur ${className}`}
    >
      {LANGS.map((l) => (
        <button
          key={l}
          role="radio"
          aria-checked={lang === l}
          title={LANG_LABEL[l]}
          onClick={() => setLang(l)}
          className={`relative rounded-full px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
            lang === l ? "text-pizarra" : "text-tiza/60 hover:text-tiza"
          }`}
        >
          {lang === l && (
            <motion.span layoutId={`lang-pill-${className}`} className="absolute inset-0 rounded-full bg-tiza" transition={{ type: "spring", bounce: 0.2 }} />
          )}
          <span className="relative">{l}</span>
        </button>
      ))}
    </div>
  );
}
