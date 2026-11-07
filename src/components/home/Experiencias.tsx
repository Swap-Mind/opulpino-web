"use client";

import { ArrowRight } from "lucide-react";
import { useBooking } from "@/components/booking/BookingProvider";
import { BOOKING_URL, EXPERIENCIAS } from "@/lib/content";
import { UI, useLang } from "@/lib/i18n";
import { Reveal, SectionTitle } from "../ui";
import Foto from "@/components/Foto";

// Tarjetas sencillas, como la referencia: foto, título, texto y "Reservar".
export default function Experiencias() {
  const { t } = useLang();
  const { onBook } = useBooking();

  return (
    <section className="bg-pizarra py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTitle kicker={t(UI.exp.kicker)} title={`${t(UI.exp.t1)} ${t(UI.exp.t2)}`} text={t(UI.exp.texto)} />

        <div className="mt-12 flex flex-wrap justify-center gap-5">
          {EXPERIENCIAS.map((e, i) => (
            <Reveal
              key={e.gallego}
              delay={(i % 3) * 0.06}
              className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-tiza/10 bg-pizarra-2">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Foto src={e.imagen} alt={t(e.titulo)} className="transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                  {e.provisional && (
                    <span className="absolute bottom-3 left-3 rounded-full bg-pizarra/75 px-2.5 py-1 text-[11px] font-semibold text-tiza/90 backdrop-blur">
                      {t(UI.carta.fotoTemporal)}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl font-medium">{t(e.titulo)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tiza/70">{t(e.texto)}</p>
                  <p className="mt-2 text-sm leading-relaxed text-tiza/50">{t(e.detalle)}</p>
                  <a
                    href={BOOKING_URL}
                    onClick={onBook}
                    target="_blank"
                    rel="noopener"
                    className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-acento hover:text-acento-2"
                  >
                    {t(UI.exp.reservar)} <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
