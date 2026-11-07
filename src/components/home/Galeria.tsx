"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { GALERIA } from "@/lib/content";
import { Reveal, SectionTitle } from "../ui";
import { UI, useLang } from "@/lib/i18n";
import Foto from "@/components/Foto";

export default function Galeria() {
  const { t } = useLang();
  const [idx, setIdx] = useState<number | null>(null);
  const close = useCallback(() => setIdx(null), []);
  const go = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + GALERIA.length) % GALERIA.length)), []);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, close, go]);

  return (
    <section className="bg-pizarra py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTitle kicker={t(UI.galeria.kicker)} title={`${t(UI.galeria.t1)} ${t(UI.galeria.t2)}`} text={t(UI.galeria.texto)} />

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {GALERIA.map((g, i) => (
            <Reveal key={g.src} delay={(i % 4) * 0.06} className="relative aspect-square">
              <button
                onClick={() => setIdx(i)}
                className="group relative h-full w-full overflow-hidden rounded-2xl"
                aria-label={t(g.titulo)}
              >
                <Foto src={g.src} alt={t(g.titulo)} sizes="(min-width: 768px) 25vw, 50vw" className="transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-pizarra/80 via-transparent to-transparent p-4 text-left text-tiza opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-sm font-semibold">{t(g.titulo)}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {idx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-pizarra/95 p-4 backdrop-blur"
            onClick={close}
            role="dialog"
            aria-modal
          >
            <button className="absolute top-5 right-5 rounded-full border border-tiza/20 p-3 text-tiza" aria-label={t(UI.galeria.cerrar)}>
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-3 rounded-full border border-tiza/20 p-3 text-tiza md:left-8"
              aria-label={t(UI.galeria.anterior)}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <motion.figure
              key={idx}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-h-[85vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Foto src={GALERIA[idx].src} alt={t(GALERIA[idx].titulo)} fill={false} sizes="90vw" className="max-h-[78vh] w-auto rounded-2xl object-contain" />
              <figcaption className="mt-4 flex justify-between text-sm text-tiza/80">
                <span>{t(GALERIA[idx].titulo)}</span>
                <span>
                  {idx + 1} / {GALERIA.length}
                </span>
              </figcaption>
            </motion.figure>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-3 rounded-full border border-tiza/20 p-3 text-tiza md:right-8"
              aria-label={t(UI.galeria.siguiente)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
