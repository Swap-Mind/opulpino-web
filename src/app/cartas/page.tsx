import type { Metadata } from "next";
import Carta from "@/components/carta/Carta";
import { PageHero } from "@/components/ui";
import { IMG } from "@/lib/content";
import { UI } from "@/lib/texts";

export const metadata: Metadata = {
  title: "Carta",
  description:
    "Carta de O'Pulpiño: pulpo á feira, pulpo a la brasa, tortilla de Betanzos, arroces, carnes a la brasa, postres gallegos y vinos de Galicia. Menú del día y alérgenos.",
};

export default function CartasPage() {
  return (
    <>
      <PageHero kicker={UI.carta.kicker} title={UI.carta.t1} italic={UI.carta.t2} text={UI.carta.texto} image={IMG.tortilla} />
      <Carta />
    </>
  );
}
