"use client";

import { MotionConfig } from "framer-motion";

// Si el sistema pide "reducir movimiento", framer-motion quita desplazamientos y
// escalas y deja solo los fundidos (Emil: menos movimiento, no cero).
export default function Movimiento({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
