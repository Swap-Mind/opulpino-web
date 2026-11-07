"use client";

import { CalendarCheck, Mail, MapPin, Navigation, Phone, Star } from "lucide-react";
import { EMAIL, IMG, PHONE, PHONE_HREF, SEDES } from "@/lib/content";
import { UI, useLang } from "@/lib/i18n";
import MailForm from "./MailForm";
import OpenStatus, { HorarioList } from "./OpenStatus";
import { Kicker, PageHero, ReserveButton, Reveal } from "./ui";

export default function ContactoView() {
  const { t, lang } = useLang();
  const C = UI.contacto;
  return (
    <>
      <PageHero kicker={C.kicker} title={C.t1} italic={C.t2} text={C.texto} image={IMG.puerta} />

      <section className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {SEDES.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-tiza/10 bg-pizarra-2 p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h2 className="font-display text-2xl font-medium">{s.zona}</h2>
                  <OpenStatus sede={s} />
                </div>
                <ul className="mt-6 space-y-3 text-sm text-tiza/75">
                  <li className="flex gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-acento" /> {s.direccion}
                  </li>
                  <li className="flex gap-2">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-acento" />
                    <a href={PHONE_HREF} className="hover:text-acento">
                      {s.telefono}
                    </a>
                  </li>
                  <li className="flex gap-2">
                    <Star className="mt-0.5 h-4 w-4 shrink-0 fill-acento text-acento" /> {s.google.rating.toFixed(1)} ·{" "}
                    {s.google.resenas.toLocaleString("es-ES")} {t(UI.resenas.resenas)} Google
                  </li>
                </ul>
                <HorarioList sede={s} className="mt-5 border-t border-tiza/10 pt-4 text-sm" />
                <a
                  href={s.google.url}
                  target="_blank"
                  rel="noopener"
                  className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-acento hover:text-acento-2"
                >
                  <Navigation className="h-4 w-4" /> {t(UI.verMaps)}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:px-8 lg:grid-cols-[1.3fr_0.7fr]">
          <Reveal className="rounded-2xl border border-tiza/10 bg-pizarra-2 p-7 text-tiza md:p-12">
            <Kicker>{t(C.envia)}</Kicker>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight md:text-4xl">{t(C.ayudamos)}</h2>
            <p className="mt-3 mb-8 text-tiza/65">{t(C.ayudamosD)}</p>
            <MailForm
              key={lang}
              subject="Consulta desde la web"
              submit={C.enviar}
              fields={[
                { name: "nombre", label: UI.form.nombre, type: "text", required: true, half: true },
                { name: "telefono", label: UI.form.telefono, type: "tel", half: true },
                { name: "email", label: UI.form.email, type: "email", required: true, half: true },
                {
                  name: "sede",
                  label: UI.form.sede,
                  type: "select",
                  options: [t(UI.form.cualquiera), ...SEDES.map((s) => s.nombre)],
                  half: true,
                },
                { name: "mensaje", label: UI.form.mensaje, type: "textarea", required: true },
              ]}
            />
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={0.1} className="flex flex-1 flex-col justify-between rounded-2xl bg-atlantico p-8 md:p-10">
              <div>
                <CalendarCheck className="h-9 w-9" />
                <span className="mt-6 block text-[11px] font-bold uppercase tracking-[0.3em] text-tiza/80">{t(C.online)}</span>
                <h2 className="mt-3 font-display text-4xl leading-[1] font-medium">{t(C.onlineT)}</h2>
                <p className="mt-4 text-tiza/90">{t(C.onlineD)}</p>
              </div>
              <ReserveButton variant="dark" className="mt-8 self-start" />
            </Reveal>
            <Reveal delay={0.15} className="rounded-2xl border border-tiza/10 bg-pizarra-2 p-8">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-tiza/45">{t(C.directo)}</h3>
              <a href={PHONE_HREF} className="mt-4 flex items-center gap-3 font-display text-2xl hover:text-acento">
                <Phone className="h-5 w-5 text-acento" /> {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className="mt-3 flex items-center gap-3 text-sm break-all text-tiza/75 hover:text-acento">
                <Mail className="h-4 w-4 shrink-0 text-acento" /> {EMAIL}
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
