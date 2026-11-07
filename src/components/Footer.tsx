"use client";

import { ArrowUpRight, Mail, MapPin, Phone, Star } from "lucide-react";
import Link from "next/link";
import { BOOKING_URL, EMAIL, FRASES, NAV, PHONE, PHONE_HREF, SEDES, SOCIAL } from "@/lib/content";
import { UI, useLang } from "@/lib/i18n";
import Logo from "./Logo";
import { HorarioList } from "./OpenStatus";
import { useBooking } from "@/components/booking/BookingProvider";

export default function Footer() {
  const { t } = useLang();
  const { onBook } = useBooking();
  return (
    <footer className="relative overflow-hidden border-t border-tiza/10 bg-pizarra-2">
      <div className="mx-auto max-w-7xl px-5 pt-20 pb-14 md:px-8 md:pt-28">
        <div className="flex flex-col items-start justify-between gap-10 border-b border-tiza/10 pb-16 md:flex-row md:items-end">
          <div>
            <p className="font-display text-lg text-tiza/55 italic">{FRASES[1]}…</p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight font-medium tracking-tight md:text-5xl">
              {t(UI.footer.guardamos1)} <em className="text-acento">{t(UI.footer.guardamos2)}</em>?
            </h2>
          </div>
          <a
            href={BOOKING_URL}
            onClick={onBook}
            target="_blank"
            rel="noopener"
            className="pulsable group relative flex w-full shrink-0 items-center justify-between gap-8 overflow-hidden rounded-2xl border border-acento/45 bg-pizarra px-6 py-5 transition-colors duration-300 hover:border-acento sm:w-auto sm:min-w-[340px] md:px-7 md:py-6"
          >
            <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-acento to-transparent" />
            <span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.3em] text-acento">{t(UI.online24)}</span>
              <span className="mt-1.5 block font-display text-3xl font-medium md:text-4xl">{t(UI.footer.reservarAhora)}</span>
            </span>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-acento text-sobre-acento transition-transform duration-300 group-hover:translate-x-1">
              <ArrowUpRight className="h-6 w-6" />
            </span>
          </a>
        </div>

        <div className="grid gap-12 pt-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.3fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-tiza/60">{t(UI.footer.lema)}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className="pulsable rounded-full border border-tiza/15 px-3 py-1.5 text-xs font-semibold text-tiza/70 transition-colors hover:border-acento hover:text-acento"
                >
                  {s.name}
                </a>
              ))}
            </div>
            <ul className="mt-8 space-y-3 text-sm">
              <li>
                <a href={PHONE_HREF} className="flex items-center gap-2 hover:text-acento">
                  <Phone className="h-4 w-4 text-acento" /> {PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 break-all hover:text-acento">
                  <Mail className="h-4 w-4 shrink-0 text-acento" /> {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-tiza/45">
              {t(UI.footer.sedes)} · {t(UI.horario)}
            </h3>
            <ul className="mt-5 space-y-6">
              {SEDES.map((s) => (
                <li key={s.id} className="text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <a href={s.google.url} target="_blank" rel="noopener" className="group flex gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-acento" />
                      <span>
                        <span className="block font-semibold group-hover:text-acento">O&apos;Pulpiño {s.corto}</span>
                        <span className="text-tiza/55">{s.direccionCorta}</span>
                      </span>
                    </a>
                    <span className="flex shrink-0 items-center gap-1 text-xs font-semibold">
                      <Star className="h-3.5 w-3.5 fill-acento text-acento" /> {s.google.rating.toFixed(1)}
                    </span>
                  </div>
                  <HorarioList sede={s} className="mt-2 ml-6 text-xs" />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-tiza/45">O&apos;Pulpiño</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-tiza/70">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-tiza">
                    {t(UI.nav[n.key])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-tiza/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 pb-24 text-xs text-tiza/45 md:flex-row md:items-center md:justify-between md:px-8 md:pb-6">
          <p>
            © {new Date().getFullYear()} {t(UI.footer.derechos)}
            <span className="mt-1 block text-tiza/35">
              {t(UI.footer.creditoFoto)}:{" "}
              <a
                href="https://commons.wikimedia.org/wiki/File:20250706_Pulpo_a_feira_con_cachelos_at_Restaurant_O_Peirao_in_Combarro_anagoria.jpg"
                target="_blank"
                rel="noopener"
                className="underline hover:text-tiza/70"
              >
                Anagoria
              </a>
              ,{" "}
              <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.es" target="_blank" rel="noopener" className="underline hover:text-tiza/70">
                CC BY-SA 4.0
              </a>
            </span>
          </p>
          <div className="flex flex-wrap gap-5">
            <Link href="/legal#aviso-legal" className="hover:text-tiza">
              {t(UI.footer.aviso)}
            </Link>
            <Link href="/legal#privacidad" className="hover:text-tiza">
              {t(UI.footer.privacidad)}
            </Link>
            <Link href="/legal#cookies" className="hover:text-tiza">
              {t(UI.footer.cookies)}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
