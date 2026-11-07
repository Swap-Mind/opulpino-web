"use client";

import { ArrowUpRight, Star } from "lucide-react";
import { GOOGLE_MEDIA, GOOGLE_TOTAL, SEDES } from "@/lib/content";
import { UI, useLang } from "@/lib/i18n";
import { Reveal, SectionTitle } from "../ui";

function Stars({ value, size = "h-5 w-5" }: { value: number; size?: string }) {
  return (
    <span className="relative inline-flex text-tiza/20" aria-label={`${value} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${size} fill-current`} />
      ))}
      <span className="absolute inset-0 flex overflow-hidden text-acento" style={{ width: `${(value / 5) * 100}%` }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`${size} shrink-0 fill-current`} />
        ))}
      </span>
    </span>
  );
}

// Puntuaciones reales de Google Maps (consultadas el 6/11/2026). Actualizar en content.ts.
export default function Resenas() {
  const { t, lang } = useLang();
  const num = (n: number, d = 0) => n.toLocaleString(lang === "en" ? "en-GB" : "es-ES", { minimumFractionDigits: d, maximumFractionDigits: d });

  return (
    <section className="bg-pizarra-2 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTitle kicker={t(UI.resenas.kicker)} title={`${t(UI.resenas.t1)} ${t(UI.resenas.t2)}`} />
        <Reveal className="mt-6 flex items-center justify-center gap-3 text-sm text-tiza/60">
          <span className="font-display text-2xl text-tiza">{num(GOOGLE_MEDIA, 1)}</span>
          <Stars value={GOOGLE_MEDIA} size="h-4 w-4" />
          <span>
            · {num(GOOGLE_TOTAL)} {t(UI.resenas.total)}
          </span>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {SEDES.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08}>
              <a
                href={s.google.url}
                target="_blank"
                rel="noopener"
                className="group flex h-full flex-col justify-between rounded-2xl border border-tiza/10 bg-pizarra p-7 transition-colors hover:border-acento/60"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-tiza/50">{s.zona}</span>
                    <GoogleG />
                  </div>
                  <div className="mt-6 flex items-end gap-4">
                    <span className="font-display text-5xl leading-none font-medium">{num(s.google.rating, 1)}</span>
                    <span className="pb-1">
                      <Stars value={s.google.rating} size="h-4 w-4" />
                      <span className="mt-1 block text-sm text-tiza/60">
                        {num(s.google.resenas)} {t(UI.resenas.resenas)}
                      </span>
                    </span>
                  </div>
                  <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-tiza/10">
                    <div className="h-full rounded-full bg-acento" style={{ width: `${(s.google.rating / 5) * 100}%` }} />
                  </div>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-acento">
                  {t(UI.resenas.leer)} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs text-tiza/40">{t(UI.resenas.fuente)}</p>
      </div>
    </section>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="h-6 w-6" aria-label="Google">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  );
}
