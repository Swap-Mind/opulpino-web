"use client";

import { Briefcase, Church, Heart, Truck } from "lucide-react";
import { IMG } from "@/lib/content";
import { UI, useLang } from "@/lib/i18n";
import MailForm from "./MailForm";
import { Chalk, Kicker, PageHero, Reveal } from "./ui";
import Foto from "@/components/Foto";

const ICONOS = [Heart, Church, Briefcase];
const FOTOS = [IMG.vinoMesa, IMG.salon, IMG.ambiente];

export default function EventosView() {
  const { t, lang } = useLang();
  const E = UI.eventos;
  return (
    <>
      <PageHero kicker={E.kicker} title={E.t1} italic={E.t2} text={E.texto} image={IMG.salonPlantas} />

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {E.tipos.map((tipo, i) => {
            const Icon = ICONOS[i];
            return (
              <Reveal key={i} delay={i * 0.08}>
                <article className="group relative h-[420px] overflow-hidden rounded-2xl">
                  <Foto src={FOTOS[i]} alt={t(tipo.t)} className="transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-pizarra via-pizarra/50 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-acento text-sobre-acento">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h2 className="mt-5 font-display text-3xl font-medium">{t(tipo.t)}</h2>
                    <p className="mt-2 text-tiza/75">{t(tipo.d)}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-pizarra-2 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Kicker>{t(E.cateringKicker)}</Kicker>
            <h2 className="mt-5 font-display text-3xl leading-tight font-medium tracking-tight md:text-[2.75rem]">
              {t(E.cateringT1)} <em className="text-acento">{t(E.cateringT2)}</em>
            </h2>
            <div className="mt-7 space-y-4 text-lg leading-relaxed text-tiza/70">
              {E.catering.map((p, i) => (
                <p key={i}>{t(p)}</p>
              ))}
            </div>
            <Chalk className="mt-8 block text-acento">{t(E.cateringChalk)}</Chalk>
          </Reveal>
          <Reveal delay={0.1} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Foto src={IMG.barraPulpo} alt="O'Pulpiño catering" sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
            <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border border-tiza/10 bg-pizarra-2 px-5 py-4 text-tiza shadow-xl md:-left-8">
              <Truck className="h-6 w-6 text-acento" />
              <span className="text-sm font-bold">{t(E.desplazamos)}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="presupuesto" className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <Reveal className="rounded-2xl border border-tiza/10 bg-pizarra-2 p-7 text-tiza md:p-12">
            <Kicker>{t(E.sinCompromiso)}</Kicker>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight md:text-4xl">{t(E.presupuestoT)}</h2>
            <p className="mt-3 mb-8 text-tiza/65">{t(E.presupuestoD)}</p>
            <MailForm
              key={lang}
              subject="Solicitud de presupuesto de evento"
              submit={E.solicitar}
              fields={[
                { name: "nombre", label: UI.form.nombre, type: "text", required: true, half: true },
                { name: "telefono", label: UI.form.telefono, type: "tel", required: true, half: true },
                { name: "email", label: UI.form.email, type: "email", required: true, half: true },
                { name: "tipo", label: UI.form.tipo, type: "select", options: UI.form.tipos[lang], required: true, half: true },
                { name: "invitados", label: UI.form.invitados, type: "number", half: true },
                { name: "fecha", label: UI.form.fecha, type: "text", half: true },
                { name: "detalles", label: UI.form.detalles, type: "textarea" },
              ]}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
