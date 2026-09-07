export type Category = "maquillaje" | "skincare";

export type ArtKind =
  | "lipstick"
  | "foundation"
  | "palette"
  | "blush"
  | "mascara"
  | "highlighter"
  | "serum"
  | "moisturizer"
  | "cleanser"
  | "sunscreen"
  | "mask"
  | "toner";

export interface ProductArt {
  kind: ArtKind;
  /** Gradiente del fondo de la tarjeta */
  bgFrom: string;
  bgTo: string;
  /** Color principal del envase */
  primary: string;
  /** Color secundario / detalles metálicos */
  secondary: string;
  /** Color del contenido (labial, polvo, líquido…) */
  fill: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  tagline: string;
  description: string;
  benefits: string[];
  usage: string;
  rating: number;
  reviews: number;
  badge?: "Nuevo" | "Más vendido" | "Oferta";
  art: ProductArt;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  maquillaje: "Maquillaje",
  skincare: "Skincare",
};

export const products: Product[] = [
  {
    id: "labial-terracota",
    name: "Labial Mate Terracota",
    category: "maquillaje",
    price: 14.99,
    tagline: "Color intenso de larga duración",
    description:
      "Labial de acabado mate aterciopelado en tono terracota, el favorito para el día a día. Fórmula enriquecida con manteca de karité que no reseca los labios.",
    benefits: [
      "Hasta 8 horas de duración",
      "No transfiere ni cuartea",
      "Con manteca de karité hidratante",
      "Aplicación suave de cobertura total",
    ],
    usage:
      "Aplica directamente sobre los labios desde el centro hacia las comisuras. Para un acabado más definido, delinea antes el contorno.",
    rating: 4.9,
    reviews: 132,
    badge: "Más vendido",
    art: {
      kind: "lipstick",
      bgFrom: "#F7E3D8",
      bgTo: "#EFC9B4",
      primary: "#7A3B2E",
      secondary: "#E3B77D",
      fill: "#C0523F",
    },
  },
  {
    id: "base-segunda-piel",
    name: "Base Líquida Segunda Piel",
    category: "maquillaje",
    price: 24.99,
    tagline: "Cobertura media, acabado natural",
    description:
      "Base ligera de cobertura modulable que unifica el tono sin efecto máscara. Disponible en 12 tonos con subtonos cálidos, neutros y fríos.",
    benefits: [
      "Acabado piel real, sin brillos",
      "Con ácido hialurónico",
      "No obstruye los poros",
      "Resistente al calor y la humedad",
    ],
    usage:
      "Aplica una pequeña cantidad en el centro del rostro y difumina hacia afuera con esponja o brocha. Suma capas donde necesites más cobertura.",
    rating: 4.7,
    reviews: 98,
    art: {
      kind: "foundation",
      bgFrom: "#F6E8DC",
      bgTo: "#EAD2BE",
      primary: "#D9B08C",
      secondary: "#8A5A3B",
      fill: "#E8C39E",
    },
  },
  {
    id: "paleta-atardecer",
    name: "Paleta de Sombras Atardecer",
    category: "maquillaje",
    price: 29.99,
    tagline: "9 tonos cálidos mates y satinados",
    description:
      "Nueve sombras inspiradas en la hora dorada: marrones suaves, dorados y un cobrizo intenso. Pigmentación alta y fácil de difuminar.",
    benefits: [
      "5 tonos mate y 4 satinados",
      "Pigmento intenso con poca producto",
      "Larga duración sin pliegues",
      "Espejo incluido, ideal para viajar",
    ],
    usage:
      "Aplica un tono de transición en el pliegue, profundiza con un marrón en la esquina exterior e ilumina el centro del párpado con un satinado.",
    rating: 4.8,
    reviews: 76,
    badge: "Nuevo",
    art: {
      kind: "palette",
      bgFrom: "#F3E2D3",
      bgTo: "#E4C3A6",
      primary: "#5C3A2E",
      secondary: "#C98A5A",
      fill: "#E0A458",
    },
  },
  {
    id: "rubor-petalo",
    name: "Rubor en Crema Pétalo",
    category: "maquillaje",
    price: 16.99,
    tagline: "Sonrojado fresco tipo mejilla mordida",
    description:
      "Rubor en crema que se funde con la piel y deja un acabado jugoso y natural. El tono pétalo favorece a todos los subtonos.",
    benefits: [
      "Textura cremosa que no marca poros",
      "Modulable de suave a intenso",
      "También sirve para labios",
      "Con vitamina E antioxidante",
    ],
    usage:
      "Sonríe y aplica un toque en la parte alta de las mejillas con los dedos o esponja, difuminando hacia las sienes.",
    rating: 4.8,
    reviews: 110,
    art: {
      kind: "blush",
      bgFrom: "#FBE4E0",
      bgTo: "#F5C6BF",
      primary: "#B4665E",
      secondary: "#E8B4A0",
      fill: "#E88B7D",
    },
  },
  {
    id: "mascara-volumen",
    name: "Máscara Volumen Total",
    category: "maquillaje",
    price: 15.99,
    tagline: "Pestañas XL sin grumos",
    description:
      "Máscara de cepillo de silicona que separa, alarga y da volumen desde la raíz. Fórmula vegana resistente al agua que se retira sin frotar.",
    benefits: [
      "Volumen visible desde la primera capa",
      "No deja grumos ni mancha el párpado",
      "Resistente al agua y al sudor",
      "Fórmula vegana con aceite de ricino",
    ],
    usage:
      "Aplica en zigzag desde la raíz hasta las puntas. Espera 30 segundos entre capas para un efecto más dramático.",
    rating: 4.6,
    reviews: 89,
    art: {
      kind: "mascara",
      bgFrom: "#EFE3E8",
      bgTo: "#DCC3CF",
      primary: "#3A2E33",
      secondary: "#D9A05B",
      fill: "#2B2126",
    },
  },
  {
    id: "iluminador-glow",
    name: "Iluminador Glow Dorado",
    category: "maquillaje",
    price: 18.99,
    originalPrice: 22.99,
    tagline: "Brillo luminoso sin purpurina",
    description:
      "Iluminador en barra de perlas finísimas que deja un glow dorado tipo “piel de vidrio”. Se funde sin marcar textura.",
    benefits: [
      "Reflejo dorado universal",
      "Perlas micronizadas, cero purpurina",
      "Formato barra ideal para llevar",
      "Apto para rostro y cuerpo",
    ],
    usage:
      "Desliza sobre pómulos, puente de la nariz, arco de cupido y clavículas. Difumina con los dedos para un acabado natural.",
    rating: 4.7,
    reviews: 64,
    badge: "Oferta",
    art: {
      kind: "highlighter",
      bgFrom: "#FBEFD8",
      bgTo: "#F3D9AC",
      primary: "#8A5A3B",
      secondary: "#E8C07A",
      fill: "#F0C878",
    },
  },
  {
    id: "serum-vitamina-c",
    name: "Sérum Vitamina C 10%",
    category: "skincare",
    price: 27.99,
    tagline: "Luminosidad y tono uniforme",
    description:
      "Sérum antioxidante con 10% de vitamina C pura que ilumina, unifica el tono y difumina manchitas de sol y acné.",
    benefits: [
      "Ilumina la piel apagada",
      "Reduce manchas e hiperpigmentación",
      "Estimula la producción de colágeno",
      "Con vitamina E y ferúlico",
    ],
    usage:
      "Aplica 3-4 gotas por la mañana sobre el rostro limpio y seco, antes de la crema hidratante. Termina siempre con protector solar.",
    rating: 4.9,
    reviews: 154,
    badge: "Más vendido",
    art: {
      kind: "serum",
      bgFrom: "#FBEBD2",
      bgTo: "#F3D3A0",
      primary: "#B06A28",
      secondary: "#5C3A1E",
      fill: "#E89B3C",
    },
  },
  {
    id: "crema-hialuronica",
    name: "Crema Hidratante Hialurónica",
    category: "skincare",
    price: 22.99,
    tagline: "Hidratación 48 h sin sensación grasa",
    description:
      "Crema gel con tres pesos moleculares de ácido hialurónico que hidrata en profundidad y deja la piel rellena y suave.",
    benefits: [
      "Hidratación profunda hasta 48 horas",
      "Textura gel ligera de absorción rápida",
      "Con ceramidas que refuerzan la barrera",
      "Apta para piel sensible",
    ],
    usage:
      "Aplica mañana y noche sobre rostro y cuello después del sérum. En climas secos, reaplica una capa fina al mediodía.",
    rating: 4.8,
    reviews: 121,
    art: {
      kind: "moisturizer",
      bgFrom: "#E4F0EE",
      bgTo: "#C4E0DA",
      primary: "#4E7A72",
      secondary: "#D8A56F",
      fill: "#F4FAF8",
    },
  },
  {
    id: "limpiador-avena",
    name: "Limpiador Facial de Avena",
    category: "skincare",
    price: 13.99,
    tagline: "Limpieza suave que no reseca",
    description:
      "Gel limpiador con avena coloidal y pH balanceado que retira impurezas y restos de maquillaje sin alterar la barrera de la piel.",
    benefits: [
      "pH 5.5, respeta la barrera cutánea",
      "Calma rojeces e irritación",
      "Espuma suave sin sulfatos",
      "Para todo tipo de piel, incluso sensible",
    ],
    usage:
      "Masajea una avellana de producto sobre el rostro húmedo durante 60 segundos, mañana y noche. Enjuaga con agua tibia.",
    rating: 4.7,
    reviews: 87,
    art: {
      kind: "cleanser",
      bgFrom: "#F2ECDD",
      bgTo: "#E2D5B8",
      primary: "#A08A5A",
      secondary: "#6B5A38",
      fill: "#F7F1E2",
    },
  },
  {
    id: "protector-spf50",
    name: "Protector Solar SPF 50 Invisible",
    category: "skincare",
    price: 19.99,
    tagline: "Protección alta sin rastro blanco",
    description:
      "Protector solar de textura ligera y acabado invisible, sin efecto blanco ni graso. Ideal como último paso de la rutina y antes del maquillaje.",
    benefits: [
      "SPF 50+ de amplio espectro UVA/UVB",
      "Acabado invisible en todos los tonos de piel",
      "No graso, no comedogénico",
      "Con niacinamida calmante",
    ],
    usage:
      "Aplica dos dedos de producto en rostro y cuello 15 minutos antes de exponerte al sol. Reaplica cada 2-3 horas.",
    rating: 4.8,
    reviews: 143,
    art: {
      kind: "sunscreen",
      bgFrom: "#FCE9C8",
      bgTo: "#F7D08E",
      primary: "#E8930C",
      secondary: "#B4640A",
      fill: "#FFF4DC",
    },
  },
  {
    id: "mascarilla-arcilla",
    name: "Mascarilla de Arcilla Rosa",
    category: "skincare",
    price: 17.99,
    tagline: "Poros limpios y piel suave",
    description:
      "Mascarilla de arcilla rosa francesa que absorbe el exceso de grasa, afina los poros y deja la piel luminosa sin tirantez.",
    benefits: [
      "Limpieza profunda de poros",
      "Absorbe grasa sin resecar",
      "Con aloe vera calmante",
      "Rinde más de 20 aplicaciones",
    ],
    usage:
      "Aplica una capa uniforme evitando el contorno de ojos, deja actuar 10 minutos y retira con agua tibia. Usa 1-2 veces por semana.",
    rating: 4.6,
    reviews: 58,
    badge: "Nuevo",
    art: {
      kind: "mask",
      bgFrom: "#FBE3E3",
      bgTo: "#F2C4C6",
      primary: "#C98A8E",
      secondary: "#8A5A44",
      fill: "#EFB7B4",
    },
  },
  {
    id: "tonico-rosas",
    name: "Tónico de Rosas",
    category: "skincare",
    price: 12.99,
    originalPrice: 15.99,
    tagline: "Refresca y prepara la piel",
    description:
      "Agua de rosas con glicerina que equilibra el pH después de la limpieza, refresca y potencia la absorción del sérum.",
    benefits: [
      "Hidrata y refresca al instante",
      "Equilibra el pH tras la limpieza",
      "Atomizador de niebla fina",
      "Aroma natural a rosas, sin alcohol",
    ],
    usage:
      "Rocía sobre el rostro limpio a 20 cm de distancia o aplica con un disco de algodón, mañana y noche antes del sérum.",
    rating: 4.7,
    reviews: 71,
    badge: "Oferta",
    art: {
      kind: "toner",
      bgFrom: "#FBE7EC",
      bgTo: "#F3C6D2",
      primary: "#B85C74",
      secondary: "#7A3B4E",
      fill: "#F0A8BC",
    },
  },
];

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5215512345678";
