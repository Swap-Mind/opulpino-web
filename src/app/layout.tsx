import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReserveFab from "@/components/ReserveFab";
import { LangProvider } from "@/lib/i18n";
import { BookingProvider } from "@/components/booking/BookingProvider";
import Movimiento from "@/components/Movimiento";
import { EMAIL, IMG, PHONE, SEDES } from "@/lib/content";

// Títulos: Cormorant Garamond (serif clásica, cursiva elegante). Texto: Jost.
// Fuentes guardadas en el proyecto (app/_fuentes): la compilación no depende de Google Fonts.
const cormorant = localFont({
  src: [
    { path: "./_fuentes/cormorant-normal.woff2", weight: "500 700", style: "normal" },
    { path: "./_fuentes/cormorant-italic.woff2", weight: "500 700", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
const jost = localFont({
  src: [{ path: "./_fuentes/jost.woff2", weight: "300 700", style: "normal" }],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://restauranteopulpino.es"),
  title: {
    default: "O'Pulpiño · Pulpería y cocina gallega en Alcalá de Henares y Alcorcón",
    template: "%s · O'Pulpiño",
  },
  description:
    "Pulpo á feira cocido a diario, marisco de las lonjas gallegas, carnes a la brasa y vinos de Galicia. Tres restaurantes en Alcalá de Henares y Alcorcón. Reserva tu mesa online.",
  openGraph: {
    title: "O'Pulpiño · Un trocito de Galicia en Madrid",
    description: "Pulpo á feira, marisco y vinos gallegos en Alcalá de Henares y Alcorcón.",
    images: [IMG.pulpo],
    locale: "es_ES",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#121211",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "O'Pulpiño",
  email: EMAIL,
  telephone: PHONE,
  subOrganization: SEDES.map((s) => ({
    "@type": "Restaurant",
    name: s.nombre,
    servesCuisine: "Gallega",
    priceRange: "€€",
    telephone: s.telefono,
    address: { "@type": "PostalAddress", streetAddress: s.direccion, addressCountry: "ES" },
    acceptsReservations: "True",
    aggregateRating: { "@type": "AggregateRating", ratingValue: s.google.rating, reviewCount: s.google.resenas },
  })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-dvh overflow-x-hidden">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Movimiento>
        <LangProvider>
          <BookingProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <ReserveFab />
          </BookingProvider>
        </LangProvider>
        </Movimiento>
      </body>
    </html>
  );
}
