"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Loader2, X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { BOOKING_EMBED, BOOKING_URL } from "@/lib/content";
import { UI, useLang } from "@/lib/i18n";
import Logo from "../Logo";

// Reserva dentro de la web: los botones de "Reservar" abren la app de reservas
// en una ventana encima de la página (iframe). Si BOOKING_EMBED es false, o el
// usuario abre el enlace con Ctrl/Cmd/botón central, se abre en una pestaña nueva.
type Ctx = { open: () => void; onBook: (e: React.MouseEvent) => void };
const BookingContext = createContext<Ctx>({ open: () => {}, onBook: () => {} });

export const useBooking = () => useContext(BookingContext);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const onBook = useCallback((e: React.MouseEvent) => {
    if (!BOOKING_EMBED) return;
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    setIsOpen(true);
  }, []);

  return (
    <BookingContext.Provider value={{ open, onBook }}>
      {children}
      <BookingModal open={isOpen} onClose={() => setIsOpen(false)} />
    </BookingContext.Provider>
  );
}

function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLang();
  const [loaded, setLoaded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    setLoaded(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-pizarra/80 backdrop-blur-sm md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal
            aria-label={t(UI.booking.titulo)}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex h-[100dvh] w-full flex-col overflow-hidden bg-pizarra-2 shadow-2xl md:h-[92vh] md:max-w-3xl md:rounded-[1.75rem] md:border md:border-tiza/10"
          >
            <div className="flex items-center justify-between gap-3 border-b border-tiza/10 px-4 py-3 md:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <span className="shrink-0 scale-75 md:scale-90">
                  <Logo compact />
                </span>
                <span className="truncate font-display text-lg md:text-xl">{t(UI.booking.titulo)}</span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener"
                  className="pulsable flex items-center gap-2 rounded-full border border-tiza/15 px-3 py-2 text-xs font-semibold text-tiza/75 transition-colors hover:border-tiza/40 hover:text-tiza"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{t(UI.booking.pestana)}</span>
                </a>
                <button
                  ref={closeRef}
                  onClick={onClose}
                  aria-label={t(UI.galeria.cerrar)}
                  className="pulsable flex h-10 w-10 items-center justify-center rounded-full bg-tiza/10 transition-colors hover:bg-tiza/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 bg-white">
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-pizarra-2 text-tiza/70">
                  <Loader2 className="h-8 w-8 animate-spin text-acento" />
                  <span className="text-sm">{t(UI.booking.cargando)}</span>
                </div>
              )}
              <iframe
                src={BOOKING_URL}
                title={t(UI.booking.titulo)}
                onLoad={() => setLoaded(true)}
                allow="payment"
                className="h-full w-full border-0"
              />
            </div>

            <p className="border-t border-tiza/10 px-4 py-2.5 text-center text-[11px] text-tiza/45 md:px-6">
              {t(UI.booking.nota)}{" "}
              <a href={BOOKING_URL} target="_blank" rel="noopener" className="underline hover:text-tiza">
                {t(UI.booking.aqui)}
              </a>
              .
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
