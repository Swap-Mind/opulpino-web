"use client";

import { CheckCircle2, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { EMAIL } from "@/lib/content";
import { UI, useLang, type L } from "@/lib/i18n";

type Field =
  | { name: string; label: L; type: "text" | "email" | "tel" | "number"; required?: boolean; half?: boolean }
  | { name: string; label: L; type: "select"; options: string[]; required?: boolean; half?: boolean }
  | { name: string; label: L; type: "textarea"; required?: boolean };

// Formulario sin servidor: prepara un correo con los datos para reservas@.
// Se puede conectar más adelante a un envío real (Resend, n8n, etc.).
export default function MailForm({ fields, subject, submit }: { fields: Field[]; subject: string; submit: L }) {
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = fields.map((f) => `${f.label.es}: ${data.get(f.name) ?? ""}`).join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const input =
    "w-full rounded-xl border border-tiza/15 bg-pizarra px-4 py-3.5 text-tiza [color-scheme:dark] placeholder:text-tiza/35 focus:border-acento focus:outline-none focus:ring-2 focus:ring-acento/20";

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle2 className="h-12 w-12 text-acento" />
        <p className="font-display text-3xl">{t(UI.form.gracias)}</p>
        <p className="max-w-sm text-tiza/65">
          {t(UI.form.abierto)}{" "}
          <a className="font-semibold text-acento" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          .
        </p>
        <button onClick={() => setSent(false)} className="text-sm font-semibold underline">
          {t(UI.form.otro)}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => (
        <label key={f.name} className={`block ${f.type === "textarea" || !("half" in f && f.half) ? "sm:col-span-2" : ""}`}>
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-tiza/55">
            {t(f.label)}
            {f.required && <span className="text-acento"> *</span>}
          </span>
          {f.type === "textarea" ? (
            <textarea name={f.name} required={f.required} rows={4} className={input} />
          ) : f.type === "select" ? (
            <select name={f.name} required={f.required} className={input} defaultValue="">
              <option value="" disabled>
                {t(UI.form.selecciona)}
              </option>
              {f.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input name={f.name} type={f.type} required={f.required} className={input} min={f.type === "number" ? 1 : undefined} />
          )}
        </label>
      ))}
      <label className="flex items-start gap-3 text-xs text-tiza/60 sm:col-span-2">
        <input type="checkbox" required className="mt-0.5 accent-acento" />
        <span>
          {t(UI.form.acepto1)}{" "}
          <Link href="/legal#privacidad" className="underline">
            {t(UI.form.acepto2)}
          </Link>
          .
        </span>
      </label>
      <button
        type="submit"
        className="pulsable mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-acento px-7 py-4 text-sm font-bold text-sobre-acento transition-colors hover:bg-acento-2 sm:col-span-2"
      >
        <Send className="h-4 w-4" /> {t(submit)}
      </button>
    </form>
  );
}
