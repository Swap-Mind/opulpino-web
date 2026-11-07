"use client";

import { useEffect, useState } from "react";
import type { Sede } from "@/lib/content";
import { formatHorario, isOpen } from "@/lib/horario";
import { UI, useLang } from "@/lib/i18n";

export default function OpenStatus({ sede, className = "" }: { sede: Sede; className?: string }) {
  const { t } = useLang();
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const tick = () => setOpen(isOpen(sede.horario));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [sede]);

  if (open === null) return <span className={`inline-block h-6 ${className}`} />;

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${
        open ? "bg-emerald-500/15 text-emerald-300" : "bg-tiza/10 text-tiza/60"
      } ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${open ? "bg-emerald-400" : "bg-tiza/40"}`} />
      </span>
      {t(open ? UI.abiertoAhora : UI.cerradoAhora)}
    </span>
  );
}

export function HorarioList({ sede, className = "" }: { sede: Sede; className?: string }) {
  const { lang } = useLang();
  return (
    <ul className={`space-y-1 ${className}`}>
      {formatHorario(sede.horario, lang).map((g) => (
        <li key={g.dias} className="flex justify-between gap-4">
          <span className="text-tiza/55">{g.dias}</span>
          <span className={`whitespace-nowrap tabular-nums ${g.cerrado ? "text-tiza/45" : ""}`}>{g.horas}</span>
        </li>
      ))}
    </ul>
  );
}
