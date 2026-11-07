"use client";

import { MapPin, Navigation, Star } from "lucide-react";
import { BOOKING_URL, type Sede } from "@/lib/content";
import { UI, useLang } from "@/lib/i18n";
import OpenStatus, { HorarioList } from "./OpenStatus";
import { useBooking } from "@/components/booking/BookingProvider";
import Foto from "@/components/Foto";

export default function SedeCard({ sede }: { sede: Sede; index?: number }) {
  const { t } = useLang();
  const { onBook } = useBooking();
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-tiza/10 bg-pizarra-2">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Foto src={sede.imagen} alt={sede.nombre} className="transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-pizarra-2 via-transparent to-transparent" />
        <OpenStatus sede={sede} className="absolute top-4 right-4 backdrop-blur" />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-acento">{t(sede.destacado)}</span>
          <a href={sede.google.url} target="_blank" rel="noopener" className="flex items-center gap-1 text-xs font-semibold text-tiza/70 hover:text-tiza">
            <Star className="h-3.5 w-3.5 fill-acento text-acento" /> {sede.google.rating.toFixed(1)} · Google
          </a>
        </div>
        <h3 className="mt-2 font-display text-3xl font-medium tracking-tight">{sede.zona}</h3>
        <p className="mt-4 flex gap-2 text-sm text-tiza/70">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-acento" /> {sede.direccionCorta}
        </p>
        <HorarioList sede={sede} className="mt-4 border-t border-tiza/10 pt-4 text-sm" />
        <div className="mt-auto flex gap-2 pt-7">
          <a
            href={BOOKING_URL}
      onClick={onBook}
            target="_blank"
            rel="noopener"
            className="flex-1 rounded-full bg-acento py-3 text-center text-sm font-bold text-sobre-acento transition-colors hover:bg-acento-2"
          >
            {t(UI.reservar)}
          </a>
          <a
            href={sede.google.url}
            target="_blank"
            rel="noopener"
            aria-label={`${t(UI.comoLlegar)} · ${sede.nombre}`}
            className="pulsable flex h-11 w-11 items-center justify-center rounded-full border border-tiza/20 transition-colors hover:border-tiza hover:bg-tiza hover:text-pizarra"
          >
            <Navigation className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
