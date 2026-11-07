"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BOOKING_URL, FRASES, NAV, PHONE, PHONE_HREF } from "@/lib/content";
import { UI, useLang } from "@/lib/i18n";
import LangSwitch from "./LangSwitch";
import Logo from "./Logo";
import { useBooking } from "@/components/booking/BookingProvider";

export default function Header() {
  const pathname = usePathname();
  const { t } = useLang();
  const { onBook } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,padding,box-shadow] duration-300 ${
          scrolled ? "bg-pizarra/85 py-3 shadow-[0_1px_0_rgba(244,239,230,0.08)] backdrop-blur-xl" : "py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
          <Link href="/" aria-label="O'Pulpiño" className="relative z-10">
            <Logo compact={scrolled} />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
            {NAV.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`pulsable relative rounded-full px-2.5 py-2 text-[13px] font-semibold whitespace-nowrap uppercase tracking-[0.12em] xl:px-3.5 xl:tracking-[0.16em] transition-colors ${
                    active ? "text-tiza" : "text-tiza/65 hover:text-tiza"
                  }`}
                >
                  {t(UI.nav[item.key])}
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-acento"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={PHONE_HREF}
              className="pulsable hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-tiza/75 transition-colors hover:text-tiza 2xl:flex"
            >
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
            <LangSwitch className="hidden md:flex" />
            <a
              href={BOOKING_URL}
      onClick={onBook}
              target="_blank"
              rel="noopener"
              className="pulsable hidden rounded-full bg-acento px-5 py-2.5 text-sm font-bold whitespace-nowrap text-sobre-acento transition-colors hover:bg-acento-2 sm:inline-flex"
            >
              {t(UI.reservar)}
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-tiza/20 lg:hidden"
              aria-label={t(open ? UI.cerrarMenu : UI.abrirMenu)}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 95% 4%)" }}
            animate={{ clipPath: "circle(150% at 95% 4%)" }}
            exit={{ clipPath: "circle(0% at 95% 4%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-pizarra-2 px-6 pt-28 pb-10 lg:hidden"
          >
            <nav className="flex flex-col gap-2" aria-label="Móvil">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  <Link href={item.href} className="font-display text-5xl font-medium text-tiza">
                    {t(UI.nav[item.key])}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="space-y-5">
              <LangSwitch className="w-fit" />
              <p className="font-display text-xl text-tiza/55 italic">{FRASES[0]}</p>
              <a
                href={BOOKING_URL}
      onClick={onBook}
                target="_blank"
                rel="noopener"
                className="flex w-full items-center justify-center rounded-full bg-acento py-4 font-bold text-sobre-acento"
              >
                {t(UI.reservar)}
              </a>
              <a href={PHONE_HREF} className="flex items-center justify-center gap-2 text-tiza/70">
                <Phone className="h-4 w-4" /> {PHONE}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
