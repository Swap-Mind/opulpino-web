"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ImageOff, Search, ShieldAlert, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ALERGENOS, CARTA, MENU_DIA, MENU_HORARIO, PLAN_SEMANA, type Alergeno } from "@/lib/carta";
import { IMG, SEDES, type Sede } from "@/lib/content";
import { UI, useLang } from "@/lib/i18n";
import { ReserveButton } from "../ui";
import Foto from "@/components/Foto";

function norm(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

const LOCALE = { es: "es-ES", en: "en-GB", gl: "gl-ES" } as const;

export default function Carta() {
  const { t, lang } = useLang();
  const [sede, setSede] = useState<Sede["id"]>("alcala");
  const [q, setQ] = useState("");
  const [sin, setSin] = useState<Alergeno[]>([]);
  const [showAlergenos, setShowAlergenos] = useState(false);
  const [hoy, setHoy] = useState("");

  useEffect(() => {
    setHoy(
      new Intl.DateTimeFormat(LOCALE[lang], { weekday: "long", day: "numeric", month: "long", timeZone: "Europe/Madrid" }).format(
        new Date(),
      ),
    );
  }, [lang]);

  const categorias = useMemo(() => {
    const nq = norm(q.trim());
    return CARTA.map((c) => ({
      ...c,
      platos: c.platos.filter(
        (p) =>
          (!p.sedes || p.sedes.includes(sede)) &&
          (!nq || norm(`${p.nombre.es} ${p.nombre[lang]} ${p.descripcion[lang]} ${c.titulo[lang]}`).includes(nq)) &&
          !sin.some((a) => p.alergenos?.includes(a)),
      ),
    })).filter((c) => c.platos.length > 0);
  }, [q, sede, sin, lang]);

  const menu = MENU_DIA[sede];
  const sedeObj = SEDES.find((s) => s.id === sede)!;
  const filtrando = q.trim() !== "" || sin.length > 0;

  return (
    <section className="pb-28">
      {/* Barra de control */}
      <div className="sticky top-[68px] z-30 border-y border-tiza/10 bg-pizarra/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1" role="tablist">
            {SEDES.map((s) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={sede === s.id}
                onClick={() => setSede(s.id)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  sede === s.id ? "text-pizarra" : "text-tiza/65 hover:text-tiza"
                }`}
              >
                {sede === s.id && (
                  <motion.span layoutId="sede-pill" className="absolute inset-0 rounded-full bg-tiza" transition={{ type: "spring", bounce: 0.2 }} />
                )}
                <span className="relative">{s.corto}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <label className="relative flex-1 md:w-80">
              <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-tiza/40" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t(UI.carta.buscar)}
                className="w-full rounded-full border border-tiza/15 bg-pizarra-2 py-2.5 pr-4 pl-11 text-sm placeholder:text-tiza/35 focus:border-acento focus:outline-none"
              />
            </label>
            <button
              onClick={() => setShowAlergenos((v) => !v)}
              aria-expanded={showAlergenos}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
                sin.length ? "border-acento bg-acento/15 text-acento" : "border-tiza/15 text-tiza/75 hover:text-tiza"
              }`}
            >
              <ShieldAlert className="h-4 w-4" />
              <span className="hidden sm:inline">{t(UI.carta.alergenos)}</span>
              {sin.length > 0 && <span className="rounded-full bg-acento px-1.5 text-xs text-sobre-acento">{sin.length}</span>}
            </button>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {showAlergenos && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-tiza/10"
            >
              <div className="mx-auto max-w-7xl px-5 py-4 md:px-8">
                <p className="text-xs font-semibold text-tiza/55">{t(UI.carta.ocultar)}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(Object.keys(ALERGENOS) as Alergeno[]).map((a) => {
                    const on = sin.includes(a);
                    return (
                      <button
                        key={a}
                        onClick={() => setSin((s) => (on ? s.filter((x) => x !== a) : [...s, a]))}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                          on ? "border-acento bg-acento text-sobre-acento" : "border-tiza/15 text-tiza/70 hover:border-tiza/40"
                        }`}
                      >
                        {on ? `${t(UI.carta.sin)} ` : ""}
                        {t(ALERGENOS[a]).toLowerCase()}
                      </button>
                    );
                  })}
                  {sin.length > 0 && (
                    <button onClick={() => setSin([])} className="px-2 text-xs font-semibold text-tiza/50 underline">
                      {t(UI.carta.limpiar)}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Menú del día + Plan */}
        {!filtrando && (
          <div className={`mt-14 grid gap-5 ${sede === PLAN_SEMANA.sede ? "lg:grid-cols-[1.4fr_1fr]" : ""}`}>
            <motion.article
              key={`menu-${sede}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-2xl border border-tiza/10 bg-pizarra-2 p-7 text-tiza md:p-10"
            >
              <div className="flex flex-wrap items-start justify-between gap-6 border-b border-dashed border-tiza/25 pb-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-acento">{t(UI.carta.especial)}</span>
                  <h2 className="mt-2 font-display text-4xl font-medium tracking-tight md:text-5xl">{t(UI.carta.menuDia)}</h2>
                  <p className="mt-1 text-sm text-tiza/60 first-letter:uppercase">
                    {hoy && `${hoy} · `}O&apos;Pulpiño {sedeObj.corto}
                  </p>
                  <p className="text-sm text-tiza/60">{t(MENU_HORARIO)}</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-tiza/50">{t(UI.carta.precioCompleto)}</span>
                  <span className="block font-display text-5xl leading-none font-medium text-acento">{menu.precio}</span>
                </div>
              </div>
              <div className="grid gap-8 pt-7 md:grid-cols-3">
                {(
                  [
                    [UI.carta.primeros, menu.primeros],
                    [UI.carta.segundos, menu.segundos],
                    [UI.carta.postres, menu.postres],
                  ] as const
                ).map(([titulo, items]) => (
                  <div key={titulo.es}>
                    <h3 className="font-display text-xl font-semibold">{t(titulo)}</h3>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-tiza/45">{t(UI.carta.aElegir)}</span>
                    <ul className="mt-4 space-y-4">
                      {items.map((it) => (
                        <li key={it.nombre.es}>
                          <span className="block font-semibold leading-snug">{t(it.nombre)}</span>
                          <span className="text-sm text-tiza/60">{t(it.nota)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-5 border-t border-dashed border-tiza/25 pt-6 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-tiza/70">
                  <strong>{t(UI.carta.incluye)}</strong> {t(menu.incluye)}
                </p>
                <ReserveButton label={UI.carta.reservarMenu} variant="dark" />
              </div>
            </motion.article>

            {sede === PLAN_SEMANA.sede && (
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="flex flex-col justify-between rounded-2xl bg-atlantico p-7 text-tiza md:p-10"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-tiza/80">{t(UI.plan.etiqueta)}</span>
                  <h2 className="mt-3 font-display text-4xl leading-none font-medium">{t(UI.plan.titulo)}</h2>
                  <p className="mt-4 leading-relaxed text-tiza/90">{t(UI.plan.texto)}</p>
                  <p className="mt-3 text-sm font-semibold text-tiza/80">{t(UI.plan.cuando)}</p>
                </div>
                <div className="relative mt-6 min-h-40 flex-1 overflow-hidden rounded-2xl">
                  <Foto src={IMG.mesa} alt="" sizes="(min-width: 1024px) 30vw, 100vw" />
                </div>
                <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-tiza/75">{t(UI.plan.todoPor)}</span>
                    <span className="block font-display text-5xl leading-none font-medium whitespace-nowrap">
                      {PLAN_SEMANA.precio}
                    </span>
                    <span className="text-sm">{t(UI.plan.para2)}</span>
                  </div>
                  <ReserveButton label={UI.plan.reservar} variant="dark" />
                </div>
              </motion.article>
            )}
          </div>
        )}

        {/* Índice de categorías */}
        {!filtrando && (
          <nav className="no-scrollbar mt-16 flex gap-2 overflow-x-auto">
            {categorias.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="pulsable shrink-0 rounded-full border border-tiza/15 px-4 py-2 text-sm font-semibold text-tiza/70 transition-colors hover:border-acento hover:text-acento"
              >
                {t(c.titulo)}
              </a>
            ))}
          </nav>
        )}

        {filtrando && (
          <div className="mt-10 flex items-center justify-between gap-4 text-sm text-tiza/60">
            <span>
              {categorias.reduce((n, c) => n + c.platos.length, 0)} {t(UI.carta.encontrados)} {sedeObj.corto}
            </span>
            <button
              onClick={() => {
                setQ("");
                setSin([]);
              }}
              className="flex shrink-0 items-center gap-1 font-semibold text-acento"
            >
              <X className="h-4 w-4" /> {t(UI.carta.quitar)}
            </button>
          </div>
        )}

        <div className="mt-10 space-y-20">
          {categorias.map((c, ci) => (
            <section key={`${sede}-${c.id}`} id={c.id} className="scroll-mt-44">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-tiza/15 pb-5">
                <h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
                  <span className="mr-3 align-top font-sans text-sm font-bold text-acento tabular-nums">
                    {String(ci + 1).padStart(2, "0")}
                  </span>
                  {t(c.titulo)}
                </h2>
                <span className="font-display text-base text-tiza/45 italic">{c.nota ? t(c.nota) : lang !== "gl" ? c.titulo.gl : ""}</span>
              </div>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {c.platos.map((p, i) => (
                  <motion.li
                    key={p.nombre.es}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: (i % 3) * 0.06 }}
                    className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-tiza/10 bg-pizarra-2"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-pizarra-3">
                      <Foto src={p.imagen} alt={t(p.nombre)} className="transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                      {p.provisional && (
                        <span className="absolute inset-x-3 bottom-3 flex items-center gap-1.5 rounded-full bg-pizarra/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-tiza backdrop-blur">
                          <ImageOff className="h-3.5 w-3.5 shrink-0 text-acento" />
                          {t(UI.carta.fotoTemporal)}
                        </span>
                      )}
                      {p.etiqueta && (
                        <span className="absolute top-3 left-3 rounded-full bg-acento px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-sobre-acento">
                          {t(p.etiqueta)}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-xl leading-snug font-medium">{t(p.nombre)}</h3>
                        <span className="shrink-0 pt-1 text-right font-semibold text-acento tabular-nums">
                          {t(p.precio).split(" · ").map((x) => (
                            <span key={x} className="block text-sm">
                              {x}
                            </span>
                          ))}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-tiza/60">{t(p.descripcion)}</p>
                      {p.alergenos?.length ? (
                        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                          {p.alergenos.map((a) => (
                            <span key={a} className="rounded-full border border-tiza/10 px-2 py-0.5 text-[11px] text-tiza/45">
                              {t(ALERGENOS[a])}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </section>
          ))}
          {categorias.length === 0 && <p className="py-20 text-center text-tiza/60">{t(UI.carta.nada)}</p>}
        </div>

        <p className="mt-16 text-center text-xs text-tiza/45">{t(UI.carta.iva)}</p>
      </div>
    </section>
  );
}
