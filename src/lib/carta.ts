import { IMG, STOCK, stock, type Sede } from "./content";
import type { L } from "./texts";

export type Alergeno = "gluten" | "crustaceos" | "huevo" | "pescado" | "moluscos" | "leche" | "frutos" | "sulfitos";

export const ALERGENOS: Record<Alergeno, L> = {
  gluten: { es: "Gluten", en: "Gluten", gl: "Glute" },
  crustaceos: { es: "Crustáceos", en: "Crustaceans", gl: "Crustáceos" },
  huevo: { es: "Huevo", en: "Egg", gl: "Ovo" },
  pescado: { es: "Pescado", en: "Fish", gl: "Peixe" },
  moluscos: { es: "Moluscos", en: "Molluscs", gl: "Moluscos" },
  leche: { es: "Leche", en: "Milk", gl: "Leite" },
  frutos: { es: "Frutos de cáscara", en: "Tree nuts", gl: "Froitos de casca" },
  sulfitos: { es: "Sulfitos", en: "Sulphites", gl: "Sulfitos" },
};

export type Plato = {
  nombre: L;
  precio: L;
  descripcion: L;
  etiqueta?: L;
  alergenos?: Alergeno[];
  imagen: string;
  // true = foto de stock; hay que sustituirla por una foto real del cliente
  provisional?: boolean;
  // Si se indica, el plato solo aparece en esas sedes
  sedes?: Sede["id"][];
};

export type Categoria = { id: string; titulo: L; nota?: L; platos: Plato[] };

const ALCORCON: Sede["id"][] = ["ensanche", "vilumbrales"];
const p = (es: string, en = es, gl = es): L => ({ es, en, gl });
const precio = (v: string) => p(v);
const pp = (v: string) => p(`${v} p.p.`, `${v} pp`, `${v} p.p.`);
const copaBotella = (copa: string, botella: string) =>
  p(`Copa ${copa} · Botella ${botella}`, `Glass ${copa} · Bottle ${botella}`, `Cunca ${copa} · Botella ${botella}`);
const s = (id: string) => stock(id);

export const CARTA: Categoria[] = [
  {
    id: "pulpeiro",
    titulo: p("El Rincón del Pulpeiro", "The Pulpeiro's Corner", "O Recuncho do Pulpeiro"),
    platos: [
      {
        nombre: p("Pulpo a la gallega", "Galician-style octopus", "Polbo á feira"),
        precio: precio("21,00 €"),
        etiqueta: p("Especialidad de la casa", "House speciality", "Especialidade da casa"),
        descripcion: p(
          "Pulpo cortado a tijera, cocido a diario por nuestro pulpeiro, con cachelos, aceite de oliva virgen extra y pimentón de la Vera.",
          "Octopus cut with scissors, cooked daily by our pulpeiro, with cachelos potatoes, extra virgin olive oil and La Vera paprika.",
          "Polbo cortado con tesoira, cocido a diario polo noso pulpeiro, con cachelos, aceite de oliva virxe extra e pemento da Vera.",
        ),
        alergenos: ["moluscos", "sulfitos"],
        imagen: IMG.pulpo,
      },
      {
        nombre: p("Pulpo a la brasa", "Chargrilled octopus", "Polbo á brasa"),
        precio: precio("24,00 €"),
        etiqueta: p("Al carbón", "Charcoal-grilled", "Ao carbón"),
        descripcion: p(
          "Servido con patata revolcona y langostinos, terminado al calor de las brasas.",
          "Served with revolcona potatoes and king prawns, finished over the embers.",
          "Servido con pataca revolcona e langostinos, rematado á calor das brasas.",
        ),
        alergenos: ["crustaceos", "moluscos", "sulfitos"],
        imagen: s(STOCK.pulpoBrasa),
        provisional: true,
      },
    ],
  },
  {
    id: "frio",
    titulo: p("Para compartir en frío", "Cold dishes to share", "Para compartir en frío"),
    platos: [
      {
        nombre: p("Jamón ibérico de bellota al corte", "Hand-carved acorn-fed Iberian ham", "Xamón ibérico de landra ao corte"),
        precio: precio("19,50 €"),
        etiqueta: p("Calidad suprema", "Top quality", "Calidade suprema"),
        descripcion: p(
          "Cortado a mano al momento con picos artesanos gallegos.",
          "Carved by hand to order, served with artisan Galician picos breadsticks.",
          "Cortado a man no momento con picos artesáns galegos.",
        ),
        imagen: s(STOCK.jamon),
        provisional: true,
        sedes: ALCORCON,
      },
      {
        nombre: p("Tartar de pimientos asados y ventresca de atún", "Roasted pepper tartare with tuna belly", "Tartar de pementos asados e ventresca de atún"),
        precio: precio("15,50 €"),
        descripcion: p(
          "Pimientos asados presentados en tartar y coronados con ventresca de atún, acompañados de hojas verdes y tomate.",
          "Roasted peppers served as a tartare, topped with tuna belly, with green leaves and tomato.",
          "Pementos asados presentados en tartar e coroados con ventresca de atún, acompañados de follas verdes e tomate.",
        ),
        alergenos: ["pescado", "sulfitos"],
        imagen: s(STOCK.tartar),
        provisional: true,
      },
      {
        nombre: p("Ensaladilla rusa de la casa", "House Russian salad", "Ensaladilla rusa da casa"),
        precio: precio("12,50 €"),
        etiqueta: p("Receta tradicional", "Traditional recipe", "Receita tradicional"),
        descripcion: p(
          "Elige entre pollo escabechado o ventresca de atún del Cantábrico sobre patata pochada.",
          "Choose pickled chicken or Cantabrian tuna belly over slow-cooked potato.",
          "Escolle entre polo en escabeche ou ventresca de atún do Cantábrico sobre pataca pochada.",
        ),
        alergenos: ["huevo", "pescado"],
        imagen: s(STOCK.ensaladilla),
        provisional: true,
        sedes: ALCORCON,
      },
      {
        nombre: p("Ensalada de burrata a los dos pestos", "Burrata salad with two pestos", "Ensalada de burrata aos dous pestos"),
        precio: precio("13,50 €"),
        descripcion: p(
          "Mezcla de tomates de huerta, cebolla morada aliñada, burrata cremosa italiana, pesto verde y rojo.",
          "Garden tomatoes, dressed red onion, creamy Italian burrata, green and red pesto.",
          "Mestura de tomates de horta, cebola morada aliñada, burrata cremosa italiana, pesto verde e vermello.",
        ),
        alergenos: ["leche", "frutos"],
        imagen: s(STOCK.burrata),
        provisional: true,
        sedes: ALCORCON,
      },
    ],
  },
  {
    id: "caliente",
    titulo: p("Para compartir en caliente", "Hot dishes to share", "Para compartir en quente"),
    platos: [
      {
        nombre: p("Tortilla de Betanzos con pulpo", "Betanzos tortilla with octopus", "Tortilla de Betanzos con polbo"),
        precio: precio("24,00 €"),
        etiqueta: p("100% jugosa", "Extra juicy", "100% zumarenta"),
        descripcion: p(
          "Nuestra tortilla jugosa de patata y huevo, coronada con pulpo y pimentón.",
          "Our runny potato and egg omelette, topped with octopus and paprika.",
          "A nosa tortilla zumarenta de pataca e ovo, coroada con polbo e pemento.",
        ),
        alergenos: ["huevo", "moluscos", "sulfitos"],
        imagen: IMG.tortilla,
      },
      {
        nombre: p("Croquetas caseras · 9 unidades", "Homemade croquettes · 9 pieces", "Croquetas caseiras · 9 unidades"),
        precio: precio("14,00 €"),
        descripcion: p(
          "Las de jamón siempre están; pregúntanos por el segundo sabor que hemos preparado esta semana.",
          "Ham croquettes are always on; ask us about this week's second flavour.",
          "As de xamón sempre están; pregúntanos polo segundo sabor que preparamos esta semana.",
        ),
        alergenos: ["gluten", "crustaceos", "huevo", "pescado", "leche", "sulfitos"],
        imagen: s(STOCK.croquetas),
        provisional: true,
      },
      {
        nombre: p("Zamburiñas a la brasa · 6 unidades", "Chargrilled queen scallops · 6 pieces", "Zamburiñas á brasa · 6 unidades"),
        precio: precio("18,00 €"),
        etiqueta: p("De la ría", "From the ría", "Da ría"),
        descripcion: p(
          "Vieira a la parrilla con aliño tradicional de ajo, perejil y aceite de oliva virgen extra.",
          "Grilled scallops with a traditional garlic, parsley and extra virgin olive oil dressing.",
          "Vieira á grella con aliño tradicional de allo, perexil e aceite de oliva virxe extra.",
        ),
        alergenos: ["moluscos"],
        imagen: s(STOCK.zamburinas),
        provisional: true,
        sedes: ALCORCON,
      },
      {
        nombre: p("Pimientos de Padrón fritos", "Fried Padrón peppers", "Pementos de Padrón fritos"),
        precio: precio("8,50 €"),
        etiqueta: p("Clásico gallego", "Galician classic", "Clásico galego"),
        descripcion: p(
          "Los auténticos pimientos gallegos fritos en aceite de oliva y flor de sal de manantial.",
          "Authentic Galician peppers fried in olive oil with spring sea-salt flakes.",
          "Os auténticos pementos galegos fritos en aceite de oliva e flor de sal de manancial.",
        ),
        imagen: s(STOCK.padron),
        provisional: true,
        sedes: ALCORCON,
      },
    ],
  },
  {
    id: "mar",
    titulo: p("Pescados y del mar", "Fish and seafood", "Peixes e do mar"),
    platos: [
      {
        nombre: p("Bacalao O'Pulpiño", "O'Pulpiño cod", "Bacallau O'Pulpiño"),
        precio: precio("20,50 €"),
        etiqueta: p("Receta O'Pulpiño", "O'Pulpiño recipe", "Receita O'Pulpiño"),
        descripcion: p(
          "Bacalao dorado acompañado de una sabrosa guarnición de patata, pimiento rojo y pimiento de Padrón.",
          "Golden cod with a tasty side of potato, red pepper and Padrón peppers.",
          "Bacallau dourado acompañado dunha saborosa guarnición de pataca, pemento vermello e pemento de Padrón.",
        ),
        alergenos: ["gluten", "pescado", "sulfitos"],
        imagen: s(STOCK.bacalao),
        provisional: true,
      },
      {
        nombre: p("Calamar fresco nacional", "Fresh local squid", "Lura fresca nacional"),
        precio: precio("24,00 €"),
        descripcion: p(
          "Preparado a la plancha y servido con patata cocida.",
          "Griddled and served with boiled potatoes.",
          "Preparada á prancha e servida con pataca cocida.",
        ),
        alergenos: ["moluscos", "sulfitos"],
        imagen: s(STOCK.calamar),
        provisional: true,
      },
    ],
  },
  {
    id: "arroces",
    titulo: p("Arroces y fideuás", "Rice and fideuà", "Arroces e fideuás"),
    nota: p("Mínimo 2 personas · precio por persona", "Minimum 2 people · price per person", "Mínimo 2 persoas · prezo por persoa"),
    platos: [
      {
        nombre: p("Arroz meloso de pulpo y zamburiñas", "Creamy rice with octopus and scallops", "Arroz meloso de polbo e zamburiñas"),
        precio: pp("23,00 €"),
        etiqueta: p("Recomendado", "Recommended", "Recomendado"),
        descripcion: p(
          "Fondo de verduras con calamar, pulpo, langostino y zamburiñas.",
          "Vegetable stock with squid, octopus, prawn and queen scallops.",
          "Fondo de verduras con lura, polbo, langostino e zamburiñas.",
        ),
        alergenos: ["crustaceos", "pescado", "moluscos", "sulfitos"],
        imagen: s(STOCK.arrozMeloso),
        provisional: true,
      },
      {
        nombre: p("Arroz con bogavante", "Lobster rice", "Arroz con lumbrigante"),
        precio: pp("25,00 €"),
        etiqueta: p("Marisco gallego", "Galician shellfish", "Marisco galego"),
        descripcion: p(
          "Arroz meloso cocinado con fondo marinero, bogavante y calamar.",
          "Creamy rice cooked in seafood stock with lobster and squid.",
          "Arroz meloso cociñado con fondo mariñeiro, lumbrigante e lura.",
        ),
        alergenos: ["crustaceos", "pescado", "moluscos", "sulfitos"],
        imagen: s(STOCK.bogavante),
        provisional: true,
      },
      {
        nombre: p("Fideuá del señoret", "Fideuà del señoret", "Fideuá do señoret"),
        precio: pp("23,00 €"),
        descripcion: p(
          "Fideuá cocinada con fondo marinero y marisco limpio para disfrutarla sin cáscaras.",
          "Noodle paella cooked in seafood stock with peeled shellfish, no shells to deal with.",
          "Fideuá cociñada con fondo mariñeiro e marisco limpo para gozala sen cascas.",
        ),
        alergenos: ["crustaceos", "pescado", "moluscos", "sulfitos"],
        imagen: s(STOCK.fideua),
        provisional: true,
      },
    ],
  },
  {
    id: "brasa",
    titulo: p("Tierra y brasa", "Land and grill", "Terra e brasa"),
    platos: [
      {
        nombre: p("Entrecot trinchado · ½ kg", "Sliced entrecôte · ½ kg", "Entrecot trinchado · ½ kg"),
        precio: precio("28,00 €"),
        etiqueta: p("500 gramos", "500 grams", "500 gramos"),
        descripcion: p(
          "Al punto que prefieras, acompañado de patatas fritas y pimientos de Padrón.",
          "Cooked to your liking, served with chips and Padrón peppers.",
          "Ao punto que prefiras, acompañado de patacas fritidas e pementos de Padrón.",
        ),
        alergenos: ["sulfitos"],
        imagen: s(STOCK.entrecot),
        provisional: true,
      },
      {
        nombre: p("Chuletón deshuesado · 1 kg", "Boneless rib steak · 1 kg", "Chuletón desosado · 1 kg"),
        precio: precio("50,00 €"),
        etiqueta: p("1 kilo", "1 kilo", "1 quilo"),
        descripcion: p(
          "Trinchado y cocinado al gusto, con patatas fritas y pimientos de Padrón.",
          "Sliced and cooked to your liking, with chips and Padrón peppers.",
          "Trinchado e cociñado ao gusto, con patacas fritidas e pementos de Padrón.",
        ),
        alergenos: ["sulfitos"],
        imagen: s(STOCK.chuleton),
        provisional: true,
      },
    ],
  },
  {
    id: "postres",
    titulo: p("Nuestros postres", "Our desserts", "As nosas sobremesas"),
    platos: [
      {
        nombre: p("Tarta de queso", "Cheesecake", "Torta de queixo"),
        precio: precio("6,50 €"),
        etiqueta: p("De la casa", "Homemade", "Da casa"),
        descripcion: p(
          "Suave, cremosa y con un delicado toque dulce. Un final irresistible para tu comida.",
          "Smooth, creamy and delicately sweet. An irresistible way to end your meal.",
          "Suave, cremosa e cun delicado toque doce. Un final irresistible para a túa comida.",
        ),
        alergenos: ["huevo", "leche"],
        imagen: s(STOCK.tartaQueso),
        provisional: true,
      },
      {
        nombre: p("Tarta de Santiago", "Tarta de Santiago (almond cake)", "Torta de Santiago"),
        precio: precio("6,50 €"),
        etiqueta: p("Repostería gallega", "Galician pastry", "Repostaría galega"),
        descripcion: p(
          "Tradicional tarta de almendra, tierna y ligeramente granulada, cubierta con azúcar glas y acompañada de nata montada y licor de café. Contiene alcohol.",
          "Traditional almond cake, tender and slightly grainy, dusted with icing sugar and served with whipped cream and coffee liqueur. Contains alcohol.",
          "Tradicional torta de améndoa, tenra e lixeiramente granulada, cuberta con azucre glas e acompañada de nata montada e licor café. Contén alcol.",
        ),
        alergenos: ["huevo", "leche", "frutos"],
        imagen: s(STOCK.santiago),
        provisional: true,
      },
      {
        nombre: p("Tarta de Orense", "Ourense cake", "Torta de Ourense"),
        precio: precio("5,50 €"),
        etiqueta: p("Especialidad de la casa", "House speciality", "Especialidade da casa"),
        descripcion: p(
          "Tarta de pan brioche con una fina capa de cuajada y nata, de textura tierna y cremosa, terminada con azúcar glas y acompañada de nata montada.",
          "Brioche cake with a thin layer of curd and cream, soft and creamy, finished with icing sugar and served with whipped cream.",
          "Torta de pan brioche cunha fina capa de callada e nata, de textura tenra e cremosa, rematada con azucre glas e acompañada de nata montada.",
        ),
        alergenos: ["gluten", "huevo", "leche"],
        imagen: s(STOCK.orense),
        provisional: true,
      },
      {
        nombre: p("Filloas de crema pastelera", "Filloas with custard", "Filloas de crema pasteleira"),
        precio: precio("6,50 €"),
        etiqueta: p("Repostería gallega", "Galician pastry", "Repostaría galega"),
        descripcion: p(
          "Filloas gallegas rellenas de suave crema pastelera, doradas y acompañadas de nata montada y dulce de leche.",
          "Galician crêpes filled with smooth custard, golden-fried and served with whipped cream and dulce de leche.",
          "Filloas galegas recheas de suave crema pasteleira, douradas e acompañadas de nata montada e doce de leite.",
        ),
        alergenos: ["gluten", "huevo", "leche"],
        imagen: s(STOCK.filloas),
        provisional: true,
      },
      {
        nombre: p("Flan", "Crème caramel", "Flan"),
        precio: precio("5,50 €"),
        etiqueta: p("Clásico", "Classic", "Clásico"),
        descripcion: p(
          "Flan de textura suave y cremosa, bañado en caramelo y acompañado de nata montada.",
          "Smooth, creamy flan bathed in caramel, served with whipped cream.",
          "Flan de textura suave e cremosa, bañado en caramelo e acompañado de nata montada.",
        ),
        alergenos: ["huevo", "leche"],
        imagen: s(STOCK.flan),
        provisional: true,
      },
      {
        nombre: p("Pudin", "Pudding", "Pudin"),
        precio: precio("5,50 €"),
        etiqueta: p("Clásico", "Classic", "Clásico"),
        descripcion: p(
          "Pudin de textura suave y jugosa, cubierto de caramelo y acompañado de nata montada.",
          "Soft, moist pudding topped with caramel and served with whipped cream.",
          "Pudin de textura suave e zumarenta, cuberto de caramelo e acompañado de nata montada.",
        ),
        alergenos: ["gluten", "huevo", "leche"],
        imagen: s(STOCK.pudin),
        provisional: true,
      },
    ],
  },
  {
    id: "vinos",
    titulo: p("Bodega de vinos gallegos", "Galician wine cellar", "Adega de viños galegos"),
    platos: [
      {
        nombre: p("O'Pulpiño Albariño · D.O. Rías Baixas"),
        precio: copaBotella("3,50 €", "18,00 €"),
        etiqueta: p("Bodega O'Pulpiño", "O'Pulpiño label", "Adega O'Pulpiño"),
        descripcion: p(
          "Vino blanco propio, afrutado y fresco con notas cítricas y salinas ideales para mariscos.",
          "Our own white wine, fruity and fresh with citrus and saline notes, ideal with shellfish.",
          "Viño branco propio, afroitado e fresco con notas cítricas e salinas ideais para mariscos.",
        ),
        alergenos: ["sulfitos"],
        imagen: IMG.albarino,
      },
      {
        nombre: p("Ribeiro Selección Turbio"),
        precio: copaBotella("3,50 €", "15,00 €"),
        descripcion: p(
          "Vino tradicional gallego servido en cunca de barro, fresco y armónico.",
          "Traditional Galician wine served in a clay cunca bowl, fresh and balanced.",
          "Viño tradicional galego servido en cunca de barro, fresco e harmónico.",
        ),
        alergenos: ["sulfitos"],
        imagen: s(STOCK.ribeiro),
        provisional: true,
      },
      {
        nombre: p("Godello · D.O. Valdeorras"),
        precio: copaBotella("3,50 €", "20,00 €"),
        descripcion: p(
          "Elegante y estructurado con notas minerales e intensas.",
          "Elegant and structured with intense mineral notes.",
          "Elegante e estruturado con notas minerais e intensas.",
        ),
        alergenos: ["sulfitos"],
        imagen: s(STOCK.godello),
        provisional: true,
      },
    ],
  },
];

type ItemMenu = { nombre: L; nota: L };
export type MenuDia = { precio: string; primeros: ItemMenu[]; segundos: ItemMenu[]; postres: ItemMenu[]; incluye: L };

export const MENU_HORARIO: L = {
  es: "De lunes a viernes, de 13:00 a 16:00 h",
  en: "Monday to Friday, 13:00 to 16:00",
  gl: "De luns a venres, de 13:00 a 16:00 h",
};

export const MENU_DIA: Record<Sede["id"], MenuDia> = {
  alcala: {
    precio: "15,50 €",
    primeros: [
      {
        nombre: p("Fabada gallega con compango de Taramundi", "Galician bean stew with Taramundi compango", "Fabada galega con compango de Taramundi"),
        nota: p("Faba estofada lentamente.", "Slow-stewed beans.", "Faba estufada lentamente."),
      },
      {
        nombre: p("Crema de marisco del Cantábrico", "Cantabrian seafood bisque", "Crema de marisco do Cantábrico"),
        nota: p("Con picatostes crujientes y gambones.", "With crunchy croutons and king prawns.", "Con picatostes crocantes e gambóns."),
      },
    ],
    segundos: [
      {
        nombre: p("Entrecot de ternera gallega al punto", "Galician veal entrecôte, medium", "Entrecot de tenreira galega ao punto"),
        nota: p("Con patatas paja y sal gorda (suplemento +2 €).", "With straw potatoes and coarse salt (+2 € supplement).", "Con patacas palla e sal grosa (suplemento +2 €)."),
      },
      {
        nombre: p("Calamares de potera en su tinta con arroz blanco", "Line-caught squid in its ink with white rice", "Luras de poteira na súa tinta con arroz branco"),
        nota: p("Receta tradicional de la abuela.", "Grandma's traditional recipe.", "Receita tradicional da avoa."),
      },
    ],
    postres: [
      {
        nombre: p("Flan de huevo casero con nata", "Homemade egg flan with cream", "Flan de ovo caseiro con nata"),
        nota: p("Elaboración diaria en cocina.", "Made fresh every day.", "Elaboración diaria en cociña."),
      },
      {
        nombre: p("Tarta de Santiago tradicional", "Traditional Tarta de Santiago", "Torta de Santiago tradicional"),
        nota: p("Con la Cruz de Santiago en azúcar glas.", "With the Cross of Saint James in icing sugar.", "Coa Cruz de Santiago en azucre glas."),
      },
    ],
    incluye: p(
      "Pan de picos, bebida de bodega, postre de la casa y café expreso.",
      "Picos breadsticks, house drink, house dessert and espresso.",
      "Pan de picos, bebida de adega, sobremesa da casa e café expreso.",
    ),
  },
  ensanche: {
    precio: "14,90 €",
    primeros: [
      {
        nombre: p("Caldo gallego tradicional con unto y compango", "Traditional Galician broth with unto and compango", "Caldo galego tradicional con unto e compango"),
        nota: p("Con verdura fresca de temporada y patatas de Coristanco.", "With fresh seasonal greens and Coristanco potatoes.", "Con verdura fresca de tempada e patacas de Coristanco."),
      },
      {
        nombre: p("Ensalada de ventresca de atún con pimientos asados", "Tuna belly salad with roasted peppers", "Ensalada de ventresca de atún con pementos asados"),
        nota: p("Pimientos asados a la leña con AOVE.", "Wood-roasted peppers with EVOO.", "Pementos asados á leña con AOVE."),
      },
      {
        nombre: p("Empanada gallega de zamburiñas al estilo ría", "Galician scallop empanada, ría-style", "Empanada galega de zamburiñas ao estilo ría"),
        nota: p("Masa fina casera recién horneada.", "Thin homemade pastry, freshly baked.", "Masa fina caseira recén forneada."),
      },
    ],
    segundos: [
      {
        nombre: p("Pulpo a la brasa sobre crema de patata", "Chargrilled octopus on potato cream", "Polbo á brasa sobre crema de pataca"),
        nota: p("Tostado a las brasas de roble (suplemento +3 €).", "Toasted over oak embers (+3 € supplement).", "Tostado nas brasas de carballo (suplemento +3 €)."),
      },
      {
        nombre: p("Churrasco de ternera gallega a la parrilla", "Grilled Galician veal churrasco", "Churrasco de tenreira galega á grella"),
        nota: p("Con patatas fritas artesanas y chimichurri.", "With hand-cut chips and chimichurri.", "Con patacas fritidas artesás e chimichurri."),
      },
      {
        nombre: p("Merluza del Cantábrico a la gallega con ajada", "Cantabrian hake Galician-style with ajada", "Pescada do Cantábrico á galega con allada"),
        nota: p("Con guisantes y cachelos cocidos.", "With peas and boiled cachelos potatoes.", "Con chícharos e cachelos cocidos."),
      },
    ],
    postres: [
      { nombre: p("Tarta de queso", "Cheesecake", "Torta de queixo"), nota: p("Receta cremosa de la casa.", "Our creamy house recipe.", "Receita cremosa da casa.") },
      { nombre: p("Filloas"), nota: p("Repostería gallega tradicional.", "Traditional Galician pastry.", "Repostaría galega tradicional.") },
    ],
    incluye: p(
      "Pan gallego artesano, una bebida y postre casero o café.",
      "Artisan Galician bread, one drink and homemade dessert or coffee.",
      "Pan galego artesán, unha bebida e sobremesa caseira ou café.",
    ),
  },
  vilumbrales: {
    precio: "14,90 €",
    primeros: [
      {
        nombre: p("Guiso de marmitako de bonito del norte", "Albacore tuna marmitako stew", "Guiso de marmitako de bonito do norte"),
        nota: p("Fondo casero con patatas pochadas.", "Homemade stock with slow-cooked potatoes.", "Fondo caseiro con patacas pochadas."),
      },
      {
        nombre: p("Salmorejo cordobés con virutas de jamón ibérico", "Córdoba salmorejo with Iberian ham shavings", "Salmorejo cordobés con labras de xamón ibérico"),
        nota: p("Con huevo campero picado.", "With chopped free-range egg.", "Con ovo campeiro picado."),
      },
    ],
    segundos: [
      {
        nombre: p("Secreto ibérico a la brasa con pimientos de Padrón", "Grilled Iberian pork secreto with Padrón peppers", "Secreto ibérico á brasa con pementos de Padrón"),
        nota: p("Jugoso a la parrilla.", "Juicy off the grill.", "Zumarento á grella."),
      },
      {
        nombre: p("Bacalao a la plancha sobre cama de pisto gallego", "Griddled cod on Galician ratatouille", "Bacallau á prancha sobre cama de pisto galego"),
        nota: p("Con aceite de ajo dorado.", "With golden garlic oil.", "Con aceite de allo dourado."),
      },
    ],
    postres: [
      {
        nombre: p("Torta de Ourense con almendras", "Ourense cake with almonds", "Torta de Ourense con améndoas"),
        nota: p("Bizcocho artesano gallego.", "Artisan Galician sponge.", "Biscoito artesán galego."),
      },
      {
        nombre: p("Helado artesanal", "Artisan ice cream", "Xeado artesanal"),
        nota: p("Vainilla, chocolate o turrón.", "Vanilla, chocolate or turrón.", "Vainilla, chocolate ou turrón."),
      },
    ],
    incluye: p(
      "Pan gallego artesano, una bebida y postre casero o café.",
      "Artisan Galician bread, one drink and homemade dessert or coffee.",
      "Pan galego artesán, unha bebida e sobremesa caseira ou café.",
    ),
  },
};

export const PLAN_SEMANA = { sede: "alcala" as Sede["id"], precio: "60 €" };
