"use client";

import { motion } from "framer-motion";
import Foto from "@/components/Foto";
import Link from "next/link";
import { useBooking } from "@/components/booking/BookingProvider";
import { BOOKING_URL } from "@/lib/content";
import { UI, useLang } from "@/lib/i18n";

const ease = [0.23, 1, 0.32, 1] as const;

// Entrada en cascada (60 ms entre piezas): etiqueta, título, texto y botones.
const grupo = { visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } };
const pieza = {
  oculto: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

// Portada sencilla y centrada (como la referencia): foto fija, etiqueta, título,
// una frase y dos botones.
export default function Hero() {
  const { t } = useLang();
  const { onBook } = useBooking();

  return (
    <section className="relative isolate flex min-h-[92svh] items-center justify-center overflow-hidden">
      {/* Foto: Anagoria, CC BY-SA 4.0 (Wikimedia Commons). */}
      <Foto src="/img/hero-pulpo.jpg" alt={t(UI.hero.alt)} sizes="100vw" priority className="-z-20 object-center" />
      <div className="absolute inset-0 -z-10 bg-pizarra/65" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-pizarra to-transparent" />

      <motion.div variants={grupo} initial="oculto" animate="visible" className="mx-auto max-w-3xl px-5 pt-24 pb-16 text-center">
        <motion.span variants={pieza} className="inline-block rounded-full border border-tiza/20 bg-pizarra/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-tiza/80 backdrop-blur-sm">
          {t(UI.hero.chalk)}
        </motion.span>
        <motion.h1 variants={pieza} className="mt-6 font-display text-[2.6rem] leading-[1.05] font-medium tracking-tight sm:text-6xl lg:text-7xl">
          {t(UI.hero.l1)} <em className="font-normal text-acento">{t(UI.hero.l2)}</em>
        </motion.h1>
        <motion.p variants={pieza} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-tiza/75 md:text-lg">{t(UI.hero.texto)}</motion.p>
        <motion.div variants={pieza} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={BOOKING_URL}
            onClick={onBook}
            target="_blank"
            rel="noopener"
            className="pulsable w-full rounded-full bg-acento px-7 py-3.5 text-sm font-semibold text-sobre-acento transition-colors hover:bg-acento-2 sm:w-auto"
          >
            {t(UI.reservarAhora)}
          </a>
          <Link
            href="/restaurantes"
            className="pulsable w-full rounded-full border border-tiza/30 px-7 py-3.5 text-sm font-semibold text-tiza transition-colors hover:border-tiza hover:bg-tiza/10 sm:w-auto"
          >
            {t(UI.hero.sedes)}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
