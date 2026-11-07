"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import { BOOKING_URL } from "@/lib/content";
import { UI, useLang } from "@/lib/i18n";
import { useBooking } from "@/components/booking/BookingProvider";

// Botón flotante abajo a la derecha: abre la reserva (ventana o pestaña nueva).
// Rectangular, oscuro con filo dorado, a juego con la carta y la cabecera.
export default function ReserveFab() {
  const { t } = useLang();
  const { onBook } = useBooking();
  // Al llegar al pie se retira: allí ya está el botón grande y taparía los enlaces legales.
  const [enPie, setEnPie] = useState(false);
  const primeraVez = useRef(true);
  useEffect(() => {
    const pie = document.querySelector("footer");
    if (!pie) return;
    const io = new IntersectionObserver(([e]) => setEnPie(e.isIntersecting), { rootMargin: "0px 0px -80px 0px" });
    io.observe(pie);
    return () => io.disconnect();
  }, []);
  return (
    <motion.a
      href={BOOKING_URL}
      onClick={onBook}
      target="_blank"
      rel="noopener"
      aria-label={`${t(UI.reservar)} · O'Pulpiño`}
      initial={{ opacity: 0, y: 24 }}
      animate={
        enPie
          ? { opacity: 0, y: 12, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }
          : { opacity: 1, y: 0, transition: { delay: primeraVez.current ? 1.2 : 0, duration: 0.4, ease: [0.23, 1, 0.32, 1] } }
      }
      onAnimationComplete={() => {
        primeraVez.current = false;
      }}
      aria-hidden={enPie || undefined}
      tabIndex={enPie ? -1 : undefined}
      style={{ pointerEvents: enPie ? "none" : "auto" }}
      className="pulsable group fixed right-4 bottom-4 z-50 flex items-center gap-3 overflow-hidden rounded-2xl border border-acento/45 bg-pizarra/90 py-2.5 pr-3 pl-2.5 text-tiza shadow-[0_20px_45px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md hover:border-acento md:right-6 md:bottom-6"
    >
      {/* filo dorado superior */}
      <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-acento to-transparent opacity-80" />
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-acento text-sobre-acento">
        <CalendarDays className="h-5 w-5" />
      </span>
      <span className="flex flex-col pr-1 leading-tight">
        <span className="font-display text-[17px] font-medium">{t(UI.reservar)}</span>
        <span className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.22em] text-acento">{t(UI.online24)}</span>
      </span>
      <span className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-tiza/10 sm:flex text-tiza/70 transition-[color,background-color,border-color] duration-200 group-hover:border-acento group-hover:bg-acento group-hover:text-sobre-acento">
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </motion.a>
  );
}
