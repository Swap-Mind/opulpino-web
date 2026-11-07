import type { Metadata } from "next";
import EventosView from "@/components/EventosView";

export const metadata: Metadata = {
  title: "Eventos y catering",
  description:
    "Bodas, bautizos, comuniones, celebraciones y comidas de empresa con el auténtico sabor gallego. Catering O'Pulpiño a domicilio. Pide tu presupuesto.",
};

export default function Eventos() {
  return <EventosView />;
}
