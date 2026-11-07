"use client";

import { Clock, MapPin, Navigation, Phone, Star } from "lucide-react";
import { IMG, PHONE_HREF, SEDES } from "@/lib/content";
import { UI, useLang } from "@/lib/i18n";
import OpenStatus, { HorarioList } from "./OpenStatus";
import { Kicker, PageHero, ReserveButton, Reveal } from "./ui";
import Foto from "@/components/Foto";

export default function RestaurantesView() {
  const { t } = useLang();
  return (
    <>
      <PageHero
        kicker={UI.restaurantes.kicker}
        title={UI.restaurantes.t1}
        italic={UI.restaurantes.t2}
        text={UI.restaurantes.texto}
        image={IMG.barra}
      />

      <div className="mx-auto max-w-7xl space-y-24 px-5 pb-28 md:space-y-36 md:px-8">
        {SEDES.map((s, i) => (
          <section key={s.id} id={s.id} className="scroll-mt-28">
            <div className={`grid gap-10 lg:grid-cols-2 lg:gap-16 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <Reveal className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Foto src={s.imagen} alt={s.nombre} sizes="(min-width: 1024px) 50vw, 100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-pizarra/60 via-transparent to-transparent" />
                </div>
              </Reveal>

              <Reveal delay={0.1} className="flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3">
                  <Kicker>{s.zona}</Kicker>
                  <OpenStatus sede={s} />
                </div>
                <h2 className="mt-5 font-display text-3xl leading-tight font-medium tracking-tight md:text-5xl">{s.nombre}</h2>
                <a href={s.google.url} target="_blank" rel="noopener" className="mt-4 flex w-fit items-center gap-2 text-sm text-tiza/70 hover:text-tiza">
                  <Star className="h-4 w-4 fill-acento text-acento" />
                  <strong className="text-tiza">{s.google.rating.toFixed(1)}</strong> · {s.google.resenas.toLocaleString("es-ES")}{" "}
                  {t(UI.resenas.resenas)} Google
                </a>
                <p className="mt-6 text-lg leading-relaxed text-tiza/70">{t(s.descripcion)}</p>

                <dl className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-tiza/10 bg-tiza/10 sm:grid-cols-[1fr_1fr]">
                  <div className="bg-pizarra-2 p-5">
                    <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-tiza/45">
                      <MapPin className="h-3.5 w-3.5 text-acento" /> {t(UI.direccion)}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed">{s.direccion}</dd>
                    <dt className="mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-tiza/45">
                      <Phone className="h-3.5 w-3.5 text-acento" /> {t(UI.telefono)}
                    </dt>
                    <dd className="mt-2 text-sm">
                      <a href={PHONE_HREF} className="hover:text-acento">
                        {s.telefono}
                      </a>
                    </dd>
                  </div>
                  <div className="bg-pizarra-2 p-5">
                    <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-tiza/45">
                      <Clock className="h-3.5 w-3.5 text-acento" /> {t(UI.horario)}
                    </dt>
                    <dd className="mt-2 text-sm">
                      <HorarioList sede={s} />
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 flex flex-wrap gap-3">
                  <ReserveButton />
                  <a
                    href={s.google.url}
                    target="_blank"
                    rel="noopener"
                    className="pulsable inline-flex items-center gap-2 rounded-full border border-tiza/30 px-6 py-3.5 text-sm font-bold transition-colors hover:bg-tiza hover:text-pizarra"
                  >
                    <Navigation className="h-4 w-4" /> {t(UI.verMaps)}
                  </a>
                </div>

                <div className="mt-8 overflow-hidden rounded-2xl border border-tiza/10">
                  <iframe
                    title={s.nombre}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(s.mapsQuery)}&z=15&output=embed`}
                    className="h-56 w-full grayscale invert-[0.92] hue-rotate-180"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Reveal>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
