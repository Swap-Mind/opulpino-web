"use client";

import { ArrowRight } from "lucide-react";
import { PLAN_SEMANA } from "@/lib/carta";
import { IMG, SEDES } from "@/lib/content";
import { UI, useLang } from "@/lib/i18n";
import SedeCard from "../SedeCard";
import { LinkButton, ReserveButton, Reveal, SectionTitle } from "../ui";
import Experiencias from "./Experiencias";
import Galeria from "./Galeria";
import Hero from "./Hero";
import Resenas from "./Resenas";
import Foto from "@/components/Foto";

// Inicio en versión sencilla (07/11/2026): secciones centradas y tonos oscuros
// con poca variación, como la web de referencia.
export default function HomeView() {
  const { t } = useLang();
  return (
    <>
      <Hero />
      <Experiencias />

      {/* Rincón del Pulpeiro + plan entre semana */}
      <section className="bg-pizarra-2 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 md:px-8 lg:grid-cols-2">
          <Reveal className="relative min-h-[420px] overflow-hidden rounded-2xl">
            <Foto src={IMG.hayDiasBos} alt={`${t(UI.pulpeiro.t1)} ${t(UI.pulpeiro.t2)}`} sizes="(min-width: 1024px) 50vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-pizarra/95 via-pizarra/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
              <h2 className="font-display text-3xl font-medium md:text-4xl">
                {t(UI.pulpeiro.t1)} <em className="font-normal text-acento">{t(UI.pulpeiro.t2)}</em>
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-tiza/75 md:text-base">{t(UI.pulpeiro.texto)}</p>
              <div className="mt-5">
                <LinkButton href="/cartas">
                  {t(UI.verCarta)} <ArrowRight className="h-4 w-4" />
                </LinkButton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col justify-between rounded-2xl border border-tiza/10 bg-pizarra p-7 md:p-9">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-acento">{t(UI.plan.etiqueta)}</span>
              <h3 className="mt-4 font-display text-3xl leading-tight font-medium md:text-4xl">{t(UI.plan.titulo)}</h3>
              <p className="mt-4 leading-relaxed text-tiza/70">{t(UI.plan.texto)}</p>
              <p className="mt-3 text-sm text-tiza/50">{t(UI.plan.cuando)}</p>
            </div>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-tiza/10 pt-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-tiza/50">{t(UI.plan.todoPor)}</span>
                <span className="block font-display text-5xl leading-none font-medium whitespace-nowrap text-acento">
                  {PLAN_SEMANA.precio}
                </span>
                <span className="text-sm text-tiza/60">{t(UI.plan.para2)}</span>
              </div>
              <ReserveButton label={UI.plan.reservar} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sedes */}
      <section className="bg-pizarra py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionTitle kicker={t(UI.sedesHome.kicker)} title={`${t(UI.sedesHome.t1)} ${t(UI.sedesHome.t2)}`} />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {SEDES.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.06}>
                <SedeCard sede={s} index={i} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <LinkButton href="/restaurantes">
              {t(UI.verRestaurantes)} <ArrowRight className="h-4 w-4" />
            </LinkButton>
          </div>
        </div>
      </section>

      <Resenas />
      <Galeria />

      {/* Eventos */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <Foto src={IMG.salonPlantas} alt="" sizes="100vw" className="-z-20" />
        <div className="absolute inset-0 -z-10 bg-pizarra/80" />
        <div className="mx-auto max-w-2xl px-5 text-center md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight font-medium md:text-[2.75rem]">
              {t(UI.eventosHome.t1)} <em className="font-normal text-acento">{t(UI.eventosHome.t2)}</em>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-tiza/70">{t(UI.eventosHome.texto)}</p>
            <div className="mt-8">
              <LinkButton href="/eventos">
                {t(UI.eventosHome.cta)} <ArrowRight className="h-4 w-4" />
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
