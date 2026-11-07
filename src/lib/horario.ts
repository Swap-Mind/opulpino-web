import type { Horario } from "./content";
import { UI, type Lang } from "./texts";

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

// Día (0 = lunes) y minuto actual en Madrid
export function madridNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const dow = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(get("weekday"));
  return { dow, min: (Number(get("hour")) % 24) * 60 + Number(get("minute")) };
}

function range(r: [string, string]) {
  const open = toMin(r[0]);
  let close = toMin(r[1]);
  if (close <= open) close += 24 * 60;
  return [open, close] as const;
}

export function isOpen(h: Horario, now = madridNow()) {
  const today = h[now.dow];
  if (today) {
    const [o, c] = range(today);
    if (now.min >= o && now.min < c) return true;
  }
  const yesterday = h[(now.dow + 6) % 7];
  if (yesterday) {
    const [, c] = range(yesterday);
    if (c > 24 * 60 && now.min < c - 24 * 60) return true;
  }
  return false;
}

// Agrupa días con el mismo horario: "Lun–Mar, Jue, Dom · 11:00–18:00"
export function formatHorario(h: Horario, lang: Lang) {
  const dias = UI.dias[lang];
  const groups = new Map<string, number[]>();
  h.forEach((r, i) => {
    const key = r ? `${r[0]}–${r[1]}` : "x";
    groups.set(key, [...(groups.get(key) ?? []), i]);
  });
  const fmtDays = (ds: number[]) => {
    const out: string[] = [];
    let start = ds[0];
    let prev = ds[0];
    for (const d of [...ds.slice(1), -1]) {
      if (d === prev + 1) {
        prev = d;
        continue;
      }
      out.push(start === prev ? dias[start] : prev === start + 1 ? `${dias[start]}, ${dias[prev]}` : `${dias[start]}–${dias[prev]}`);
      start = prev = d;
    }
    return out.join(", ");
  };
  return [...groups.entries()]
    .sort((a, b) => a[1][0] - b[1][0])
    .map(([k, ds]) => ({ dias: fmtDays(ds), horas: k === "x" ? UI.cerrado[lang] : k, cerrado: k === "x" }));
}
