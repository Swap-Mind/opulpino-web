"use client";

/* eslint-disable @next/next/no-img-element */
import { IMG } from "@/lib/content";
import { UI, useLang } from "@/lib/i18n";

export default function Logo({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  return (
    <span className="flex items-center gap-3">
      <img
        src={IMG.logo}
        alt="O'Pulpiño"
        width={143}
        height={143}
        className={`rounded-full object-contain transition-[width,height] duration-300 ease-out ${compact ? "h-11 w-11" : "h-14 w-14"}`}
      />
      <span className="hidden flex-col leading-none whitespace-nowrap sm:flex lg:hidden xl:flex">
        <span className="font-display text-xl font-semibold tracking-tight">O&apos;Pulpiño</span>
        <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.3em] text-tiza/50">{t(UI.pulperia)}</span>
      </span>
    </span>
  );
}
