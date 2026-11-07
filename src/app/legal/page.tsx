import type { Metadata } from "next";
import LegalView from "@/components/LegalView";

export const metadata: Metadata = { title: "Aviso legal y privacidad", robots: { index: false } };

export default function Legal() {
  return <LegalView />;
}
