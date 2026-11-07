import type { Metadata } from "next";
import RestaurantesView from "@/components/RestaurantesView";

export const metadata: Metadata = {
  title: "Restaurantes",
  description:
    "O'Pulpiño en Alcalá de Henares (C.C. La Garena), Ensanche Sur y Vilumbrales (Alcorcón). Direcciones, horarios y reservas.",
};

export default function Restaurantes() {
  return <RestaurantesView />;
}
