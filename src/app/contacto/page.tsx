import type { Metadata } from "next";
import ContactoView from "@/components/ContactoView";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta con O'Pulpiño: teléfono, email, horarios y ubicación de nuestras sedes en Alcalá de Henares y Alcorcón.",
};

export default function Contacto() {
  return <ContactoView />;
}
