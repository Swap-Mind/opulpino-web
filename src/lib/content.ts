// Todo el contenido de la web vive aquí para poder editarlo sin tocar el diseño.
import type { L } from "./texts";

export const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL || "https://www.swapmindrestaurantes.com/reservar/opulpino";
// Reserva dentro de la web: con NEXT_PUBLIC_BOOKING_EMBED=1 los botones "Reservar"
// abren la app de reservas en una ventana encima de la página. Necesita que la app
// tenga este dominio en RESERVA_INCRUSTADA_ORIGENES. Sin la variable, los botones
// abren la app en una pestaña nueva (como la versión anterior).
export const BOOKING_EMBED = process.env.NEXT_PUBLIC_BOOKING_EMBED === "1";
export const PHONE = "+34 690 01 88 47";
export const PHONE_HREF = "tel:+34690018847";
export const EMAIL = "reservas@restauranteopulpino.es";


// Fotos reales del restaurante (de su web actual), preparadas en public/img
// (máx. 1800 px, JPEG progresivo, con miniatura borrosa en fotos.json).
export const IMG = {
  logo: "/img/logo.png",
  pulpo: "/img/pulpo.jpg",
  pulpo2: "/img/pulpo2.jpg",
  tortilla: "/img/tortilla.jpg",
  mural: "/img/mural.jpg",
  barraPulpo: "/img/barraPulpo.jpg",
  salon: "/img/salon.jpg",
  barra: "/img/barra.jpg",
  salonPlantas: "/img/salonPlantas.jpg",
  echaOQueHai: "/img/echaOQueHai.jpg",
  vinoMesa: "/img/vinoMesa.jpg",
  bodega: "/img/bodega.jpg",
  ambiente: "/img/ambiente.jpg",
  albarino: "/img/albarino.jpg",
  terraza: "/img/terraza.jpg",
  puerta: "/img/puerta.jpg",
  mesa: "/img/mesa.jpg",
  hayDiasBos: "/img/hayDiasBos.jpg",
  ensanche: "/img/ensanche.jpg",
};

// Fotos provisionales (Unsplash, licencia libre) hasta recibir las del cliente
// Antes era la URL de Unsplash; ahora las fotos están en public/img/stock.
export const stock = (src: string) => src;

export const STOCK = {
  marisco: "/img/stock/marisco.jpg",
  carne: "/img/stock/carne.jpg",
  arroz: "/img/stock/arroz.jpg",
  pescado: "/img/stock/pescado.jpg",
  pulpoBrasa: "/img/stock/pulpoBrasa.jpg",
  chuleton: "/img/stock/chuleton.jpg",
  arrozMeloso: "/img/stock/arrozMeloso.jpg",
  fideua: "/img/stock/fideua.jpg",
  bogavante: "/img/stock/bogavante.jpg",
  croquetas: "/img/stock/croquetas.jpg",
  jamon: "/img/stock/jamon.jpg",
  ensaladilla: "/img/stock/ensaladilla.jpg",
  burrata: "/img/stock/burrata.jpg",
  zamburinas: "/img/stock/zamburinas.jpg",
  padron: "/img/stock/padron.jpg",
  bacalao: "/img/stock/bacalao.jpg",
  calamar: "/img/stock/calamar.jpg",
  entrecot: "/img/stock/entrecot.jpg",
  tartaQueso: "/img/stock/tartaQueso.jpg",
  santiago: "/img/stock/santiago.jpg",
  orense: "/img/stock/orense.jpg",
  filloas: "/img/stock/filloas.jpg",
  flan: "/img/stock/flan.jpg",
  pudin: "/img/stock/pudin.jpg",
  ribeiro: "/img/stock/ribeiro.jpg",
  godello: "/img/stock/godello.jpg",
  tartar: "/img/stock/tartar.jpg",
};

export const NAV = [
  { href: "/", key: "inicio" },
  { href: "/restaurantes", key: "restaurantes" },
  { href: "/cartas", key: "carta" },
  { href: "/eventos", key: "eventos" },
  { href: "/contacto", key: "contacto" },
] as const;

export const SOCIAL = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "Facebook", href: "https://facebook.com" },
  { name: "YouTube", href: "https://youtube.com" },
  { name: "TripAdvisor", href: "https://tripadvisor.com" },
];

// Frases de las paredes de los locales (en gallego en todos los idiomas)
export const FRASES = [
  "Hai días bos e días mellores",
  "Echa o que hai",
  "Xa comín, vou durmir",
  "Quedar como un rei",
  "Pulpo á feira",
  "Do mar á túa mesa",
];

// Horario semanal: índice 0 = lunes … 6 = domingo. null = cerrado. Fuente: Google Maps (nov. 2026).
export type Horario = ([string, string] | null)[];

export type Sede = {
  id: "alcala" | "ensanche" | "vilumbrales";
  nombre: string;
  zona: string;
  corto: string;
  descripcion: L;
  destacado: L;
  direccion: string;
  direccionCorta: string;
  telefono: string;
  horario: Horario;
  imagen: string;
  mapsQuery: string;
  google: { rating: number; resenas: number; url: string };
};

export const SEDES: Sede[] = [
  {
    id: "alcala",
    nombre: "O'Pulpiño Alcalá de Henares",
    zona: "Alcalá de Henares",
    corto: "Alcalá",
    descripcion: { es: "En el Centro Comercial La Garena. Carta completa y una terraza grande al aire libre.", en: "In La Garena shopping centre. Full menu and a large open-air terrace.", gl: "No Centro Comercial La Garena. Carta completa e unha terraza grande ao aire libre." },
    destacado: { es: "Gran terraza abierta", en: "Large open terrace", gl: "Gran terraza aberta" },
    direccion: "Centro Comercial La Garena, Av. Juan Carlos I, 13, Local 35, 28806 Alcalá de Henares, Madrid",
    direccionCorta: "C.C. La Garena, Local 35",
    telefono: PHONE,
    horario: [["11:00", "18:00"], ["11:00", "18:00"], null, ["11:00", "18:00"], ["11:00", "24:00"], ["11:00", "24:00"], ["11:00", "18:00"]],
    imagen: IMG.terraza,
    mapsQuery: "O'Pulpiño Alcalá, Av. Juan Carlos I, 13, Local 35, Alcalá de Henares",
    google: { rating: 4.6, resenas: 511, url: "https://maps.google.com/?cid=2247095215994994466" },
  },
  {
    id: "ensanche",
    nombre: "O'Pulpiño Ensanche Alcorcón",
    zona: "Ensanche Sur (Alcorcón)",
    corto: "Ensanche Sur",
    descripcion: { es: "En el Ensanche Sur de Alcorcón. Local amplio y luminoso, con la carta completa.", en: "In Alcorcón's Ensanche Sur. A bright, spacious room with the full menu.", gl: "No Ensanche Sur de Alcorcón. Local amplo e luminoso, coa carta completa." },
    destacado: { es: "Grandes espacios", en: "Spacious venue", gl: "Grandes espazos" },
    direccion: "C. Martín Luther King, 9, Loc 8, 28922 Alcorcón, Madrid",
    direccionCorta: "C. Martín Luther King, 9, Loc 8",
    telefono: PHONE,
    horario: [null, ["11:30", "24:00"], ["11:30", "24:00"], ["11:30", "24:00"], ["11:30", "01:00"], ["11:30", "01:00"], ["11:30", "24:00"]],
    imagen: IMG.ensanche,
    mapsQuery: "O´Pulpiño Furancho Ensanche, C. Martín Luther King, 9, Alcorcón",
    google: { rating: 4.1, resenas: 362, url: "https://maps.google.com/?cid=573031646967996298" },
  },
  {
    id: "vilumbrales",
    nombre: "O'Pulpiño Vilumbrales Alcorcón",
    zona: "Vilumbrales (Alcorcón)",
    corto: "Vilumbrales",
    descripcion: { es: "Junto al metro Joaquín Vilumbrales. Al entrar está el rincón del pulpeiro, donde el pulpo se cuece a la vista.", en: "Next to Joaquín Vilumbrales metro. By the entrance, the pulpeiro's corner, where the octopus is cooked in front of you.", gl: "Xunto ao metro Joaquín Vilumbrales. Ao entrar está o recuncho do pulpeiro, onde o polbo se coce á vista." },
    destacado: { es: "El Rincón del Pulpeiro", en: "The Pulpeiro's Corner", gl: "O Recuncho do Pulpeiro" },
    direccion: "C. Carballino, 29, 28925 Alcorcón, Madrid",
    direccionCorta: "C. Carballino, 29",
    telefono: PHONE,
    horario: [["09:30", "24:00"], ["09:30", "24:00"], ["09:30", "24:00"], ["09:30", "24:00"], ["09:30", "24:00"], ["10:00", "00:30"], ["09:30", "24:00"]],
    imagen: IMG.hayDiasBos,
    mapsQuery: "O´Pulpiño, C. Carballino, 29, Alcorcón",
    google: { rating: 4.0, resenas: 2273, url: "https://maps.google.com/?cid=5464647177903515653" },
  },
];

export const GOOGLE_TOTAL = SEDES.reduce((n, s) => n + s.google.resenas, 0);
export const GOOGLE_MEDIA =
  Math.round((SEDES.reduce((n, s) => n + s.google.rating * s.google.resenas, 0) / GOOGLE_TOTAL) * 10) / 10;

export const EXPERIENCIAS: { titulo: L; gallego: string; texto: L; detalle: L; imagen: string; provisional?: boolean }[] = [
  {
    titulo: { es: "Pulpo", en: "Octopus", gl: "Polbo" },
    gallego: "Polbo á feira",
    texto: { es: "Á feira o a la brasa, cocido cada día.", en: "Á feira or chargrilled, cooked every day.", gl: "Á feira ou á brasa, cocido cada día." },
    detalle: { es: "Con cachelos, aceite de oliva y pimentón de la Vera.", en: "With potatoes, olive oil and La Vera paprika.", gl: "Con cachelos, aceite de oliva e pemento da Vera." },
    imagen: IMG.pulpo,
  },
  {
    titulo: { es: "Marisco", en: "Shellfish", gl: "Marisco" },
    gallego: "Do mar",
    texto: { es: "Percebes, cigalas, zamburiñas y centollo.", en: "Goose barnacles, langoustines, scallops and spider crab.", gl: "Percebes, cigalas, zamburiñas e centola." },
    detalle: { es: "Según lo que llegue cada día de la lonja.", en: "Depending on what arrives from the market each day.", gl: "Segundo o que chegue cada día da lonxa." },
    imagen: stock(STOCK.marisco),
    provisional: true,
  },
  {
    titulo: { es: "Carnes gallegas", en: "Galician beef", gl: "Carnes galegas" },
    gallego: "Rubia galega",
    texto: { es: "Ternera gallega a la parrilla.", en: "Grilled Galician beef.", gl: "Tenreira galega á grella." },
    detalle: { es: "Entrecot y chuletón con patatas y pimientos de Padrón.", en: "Entrecôte and rib steak with chips and Padrón peppers.", gl: "Entrecot e chuletón con patacas e pementos de Padrón." },
    imagen: stock(STOCK.carne),
    provisional: true,
  },
  {
    titulo: { es: "Arroces", en: "Rice dishes", gl: "Arroces" },
    gallego: "Arroces",
    texto: { es: "Melosos, para compartir entre dos o más.", en: "Creamy, for two or more to share.", gl: "Melosos, para compartir entre dous ou máis." },
    detalle: { es: "Con pulpo y zamburiñas, con bogavante o en fideuá.", en: "With octopus and scallops, with lobster, or as fideuà.", gl: "Con polbo e zamburiñas, con lumbrigante ou en fideuá." },
    imagen: stock(STOCK.arroz),
    provisional: true,
  },
  {
    titulo: { es: "Pescados", en: "Fish", gl: "Peixes" },
    gallego: "Peixes",
    texto: { es: "Bacalao, calamar y pescado del día.", en: "Cod, squid and the catch of the day.", gl: "Bacallau, lura e peixe do día." },
    detalle: { es: "Sencillos: a la plancha o a la gallega.", en: "Kept simple: griddled or Galician-style.", gl: "Sinxelos: á prancha ou á galega." },
    imagen: stock(STOCK.pescado),
    provisional: true,
  },
];

export const GALERIA: { src: string; titulo: L }[] = [
  { src: IMG.pulpo2, titulo: { es: "Pulpo á feira", en: "Pulpo á feira", gl: "Polbo á feira" } },
  { src: IMG.salonPlantas, titulo: { es: "Ambiente de cenas", en: "Evening atmosphere", gl: "Ambiente de ceas" } },
  { src: IMG.barraPulpo, titulo: { es: "Nuestra barra", en: "Our bar", gl: "A nosa barra" } },
  { src: IMG.bodega, titulo: { es: "Bodega de vinos gallegos", en: "Galician wine cellar", gl: "Adega de viños galegos" } },
  { src: IMG.mural, titulo: { es: "O polbo da casa", en: "O polbo da casa", gl: "O polbo da casa" } },
  { src: IMG.terraza, titulo: { es: "Terraza de verano", en: "Summer terrace", gl: "Terraza de verán" } },
  { src: IMG.echaOQueHai, titulo: { es: "Echa o que hai", en: "Echa o que hai", gl: "Echa o que hai" } },
  { src: IMG.albarino, titulo: { es: "Albariño O'Pulpiño", en: "O'Pulpiño Albariño", gl: "Albariño O'Pulpiño" } },
];
