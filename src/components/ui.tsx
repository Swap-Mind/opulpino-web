"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BOOKING_URL } from "@/lib/content";
import { UI, useLang, type L } from "@/lib/i18n";
import { useBooking } from "@/components/booking/BookingProvider";
import Foto from "@/components/Foto";

export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  ...rest
}: { delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-acento ${className}`}>{children}</span>
  );
}

// Frase en gallego: discreta, en cursiva de la serif (antes letra de tiza).
export function Chalk({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-display text-lg italic leading-snug text-tiza/60 ${className}`}>{children}</span>;
}

// Cabecera de sección centrada, como la referencia: etiqueta, título y entradilla.
export function SectionTitle({
  kicker,
  title,
  text,
  className = "",
}: {
  kicker: React.ReactNode;
  title: React.ReactNode;
  text?: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`mx-auto max-w-2xl text-center ${className}`}>
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-3 font-display text-3xl leading-tight font-medium tracking-tight md:text-[2.75rem]">{title}</h2>
      {text && <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-tiza/60">{text}</p>}
    </Reveal>
  );
}

export function ReserveButton({
  label = UI.reservar,
  variant = "solid",
  className = "",
}: {
  label?: L | string;
  variant?: "solid" | "ghost" | "dark";
  className?: string;
}) {
  const { t } = useLang();
  const { onBook } = useBooking();
  const styles = {
    solid: "bg-acento text-sobre-acento hover:bg-acento-2",
    ghost: "border border-tiza/30 text-tiza hover:border-tiza hover:bg-tiza hover:text-pizarra",
    dark: "bg-pizarra text-tiza hover:bg-acento hover:text-sobre-acento",
  }[variant];
  return (
    <a
      href={BOOKING_URL}
      onClick={onBook}
      target="_blank"
      rel="noopener"
      className={`pulsable group inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-bold tracking-wide transition-colors duration-300 ${styles} ${className}`}
    >
      {t(label)}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

export function LinkButton({
  href,
  children,
  variant = "ghost",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "ghost" | "light";
  className?: string;
}) {
  const styles =
    variant === "ghost"
      ? "border border-tiza/30 text-tiza hover:border-tiza hover:bg-tiza hover:text-pizarra"
      : "border border-pizarra/25 text-pizarra hover:bg-pizarra hover:text-tiza";
  return (
    <Link
      href={href}
      className={`pulsable inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-bold tracking-wide transition-colors duration-300 ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}

export function PageHero({
  kicker,
  title,
  italic,
  text,
  image,
}: {
  kicker: L;
  title: L;
  italic?: L;
  text: L;
  image: string;
}) {
  const { t } = useLang();
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
      <Foto src={image} alt="" sizes="100vw" priority className="-z-20 opacity-30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-pizarra/75 via-pizarra/85 to-pizarra" />
      <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
        <Reveal>
          <Kicker>{t(kicker)}</Kicker>
          <h1 className="mt-4 font-display text-4xl leading-tight font-medium tracking-tight md:text-6xl">
            {t(title)} {italic && <em className="font-normal text-acento">{t(italic)}</em>}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-tiza/65 md:text-lg">{t(text)}</p>
        </Reveal>
      </div>
    </section>
  );
}
