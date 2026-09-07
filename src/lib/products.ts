export type Category = "maquillaje" | "skincare"

export type Subcategory =
  | "rostro"
  | "ojos"
  | "labios"
  | "limpieza"
  | "tratamiento"
  | "hidratacion"
  | "proteccion"

export type VisualKind =
  | "foundation"
  | "concealer"
  | "blush"
  | "highlighter"
  | "palette"
  | "liner"
  | "mascara"
  | "lipstick"
  | "gloss"
  | "powder"
  | "cleanser"
  | "toner"
  | "serum"
  | "cream"
  | "eyecream"
  | "mask"
  | "sunscreen"
  | "oil"

export type Product = {
  slug: string
  name: string
  tagline: string
  description: string
  howToUse: string
  ingredients: string[]
  category: Category
  subcategory: Subcategory
  price: number
  volume: string
  stock: number
  featured?: boolean
  isNew?: boolean
  visual: VisualKind
  palette: {
    from: string
    to: string
    accent: string
  }
}

export const categories: { id: Category; label: string; description: string }[] =
  [
    {
      id: "maquillaje",
      label: "Maquillaje",
      description: "Rostro, ojos y labios con acabado suave y pigmentos vivos.",
    },
    {
      id: "skincare",
      label: "Skincare",
      description: "Limpieza, tratamientos e hidratación para el clima venezolano.",
    },
  ]

export const subcategories: Record<
  Category,
  { id: Subcategory; label: string }[]
> = {
  maquillaje: [
    { id: "rostro", label: "Rostro" },
    { id: "ojos", label: "Ojos" },
    { id: "labios", label: "Labios" },
  ],
  skincare: [
    { id: "limpieza", label: "Limpieza" },
    { id: "tratamiento", label: "Tratamiento" },
    { id: "hidratacion", label: "Hidratación" },
    { id: "proteccion", label: "Protección" },
  ],
}

export const products: Product[] = [
  {
    slug: "base-bloom-velvet",
    name: "Base Bloom Velvet",
    tagline: "Cobertura media, piel con aspecto descansado",
    description:
      "Base ligera de acabado aterciopelado que unifica el tono sin tapar la piel. Resistente a la humedad de Caracas y fácil de construir en capas.",
    howToUse:
      "Aplica una pequeña cantidad desde el centro del rostro hacia afuera con esponja o brocha. Sella con Polvo Seda si buscas más duración.",
    ingredients: ["Ácido hialurónico", "Vitamina E", "Pigmentos minerales"],
    category: "maquillaje",
    subcategory: "rostro",
    price: 18.5,
    volume: "30 ml",
    stock: 14,
    featured: true,
    visual: "foundation",
    palette: { from: "#F4E0D6", to: "#E8C4B8", accent: "#A56B5C" },
  },
  {
    slug: "corrector-petalo",
    name: "Corrector Pétalo",
    tagline: "Ilumina ojeras y disimula rojeces",
    description:
      "Corrector cremoso que no se cuartea. Cubre ojeras y pequeñas marcas con un tono cálido que no deja efecto gris.",
    howToUse:
      "Puntea bajo el ojo y en el centro del rostro. Difumina con el dedo anular o una esponja húmeda.",
    ingredients: ["Manteca de karité", "Cafeína", "Vitamina C"],
    category: "maquillaje",
    subcategory: "rostro",
    price: 12,
    volume: "8 ml",
    stock: 22,
    visual: "concealer",
    palette: { from: "#F7E8D8", to: "#EDD0B4", accent: "#C49A6C" },
  },
  {
    slug: "rubor-sakura-dawn",
    name: "Rubor Sakura Dawn",
    tagline: "Color de flor de cerezo en las mejillas",
    description:
      "Rubor en polvo satinado, el rosa que ves en nuestro logo. Da un glow saludable sin verse harinoso sobre piel morena o clara.",
    howToUse:
      "Barre sobre el pómulo hacia la sien. Para un look más intenso, aplica en capas finas.",
    ingredients: ["Mica", "Aceite de jojoba", "Extracto de rosa"],
    category: "maquillaje",
    subcategory: "rostro",
    price: 14.5,
    volume: "6 g",
    stock: 18,
    featured: true,
    isNew: true,
    visual: "blush",
    palette: { from: "#F6D5DC", to: "#E8B4C0", accent: "#C97B8D" },
  },
  {
    slug: "iluminador-rocio",
    name: "Iluminador Rocío",
    tagline: "Destello húmedo, nunca glitter grueso",
    description:
      "Iluminador en polvo fino para pómulos, arco de cupido y lagrimal. Refleja luz como rocío sobre pétalos.",
    howToUse:
      "Aplica con brocha pequeña en los puntos altos del rostro. Evita el centro de la frente si tu piel es muy grasa.",
    ingredients: ["Perla sintética", "Squalane vegetal", "Vitamina E"],
    category: "maquillaje",
    subcategory: "rostro",
    price: 16,
    volume: "7 g",
    stock: 9,
    visual: "highlighter",
    palette: { from: "#F4E6D8", to: "#E8D0C0", accent: "#D4A574" },
  },
  {
    slug: "polvo-seda",
    name: "Polvo Seda",
    tagline: "Sella el maquillaje sin efecto máscara",
    description:
      "Polvo suelto translúcido que controla el brillo en la zona T y deja la piel con tacto de seda.",
    howToUse:
      "Presiona con puff o brocha esponjada sobre mentón, nariz y frente. Sacude el exceso.",
    ingredients: ["Sílice", "Arroz fermentado", "Niacinamida"],
    category: "maquillaje",
    subcategory: "rostro",
    price: 15,
    volume: "10 g",
    stock: 11,
    visual: "powder",
    palette: { from: "#F3EDE4", to: "#E4D5C8", accent: "#9C8574" },
  },
  {
    slug: "paleta-aurora",
    name: "Paleta Aurora",
    tagline: "Nueve sombras mate y satinadas",
    description:
      "Paleta de ojos con neutrales cálidos y un rosa Bloom. Ideal para look de oficina o una noche en Las Mercedes.",
    howToUse:
      "Usa el tono claro en el párpado, el medio en la cuenca y el más oscuro para definir. Humedece el pincel para más intensidad.",
    ingredients: ["Talco", "Mica", "Dimeticona"],
    category: "maquillaje",
    subcategory: "ojos",
    price: 22,
    volume: "9 × 1.2 g",
    stock: 0,
    featured: true,
    visual: "palette",
    palette: { from: "#E8D4E0", to: "#C9B0C8", accent: "#7A5A78" },
  },
  {
    slug: "delineador-tinta",
    name: "Delineador Tinta",
    tagline: "Negro intenso, punta firme",
    description:
      "Delineador líquido de secado rápido. Trazo preciso para delineado clásico o un wing definido que aguanta el día.",
    howToUse:
      "Apoya el codo y traza desde el lagrimal hacia afuera. Deja secar 20 segundos antes de parpadear.",
    ingredients: ["Polímeros filmógenos", "Carbón vegetal", "Glicerina"],
    category: "maquillaje",
    subcategory: "ojos",
    price: 9.5,
    volume: "3 ml",
    stock: 25,
    visual: "liner",
    palette: { from: "#E8E2DC", to: "#C9C0B8", accent: "#2C2420" },
  },
  {
    slug: "mascara-pestana-larga",
    name: "Máscara Pestaña Larga",
    tagline: "Alarga y separa, sin grumos",
    description:
      "Fórmula que estira las pestañas y las mantiene flexibles. El cepillo define de raíz a punta.",
    howToUse:
      "Zigzag desde la raíz. Una capa para diario, dos para más drama. Se retira con el Gel Limpiador Camelia.",
    ingredients: ["Cera de carnauba", "Pantenol", "Queratina vegetal"],
    category: "maquillaje",
    subcategory: "ojos",
    price: 13,
    volume: "10 ml",
    stock: 16,
    featured: true,
    visual: "mascara",
    palette: { from: "#EDE4EA", to: "#D4C0D0", accent: "#4A3040" },
  },
  {
    slug: "labial-satin-bloom",
    name: "Labial Satin Bloom",
    tagline: "Rosa cerezo satinado que no reseca",
    description:
      "Labial de cobertura completa y brillo satinado. El tono Bloom es un rosa con fondo cálido, favorecedor en casi todos los tonos de piel.",
    howToUse:
      "Aplica directo del tubo o con pincel. Para más duración, perfila con el Delineador Tinta en el arco y difumina.",
    ingredients: ["Manteca de cacao", "Cera de abeja", "Vitamina E"],
    category: "maquillaje",
    subcategory: "labios",
    price: 11.5,
    volume: "3.5 g",
    stock: 20,
    featured: true,
    isNew: true,
    visual: "lipstick",
    palette: { from: "#F2C9D0", to: "#D9899A", accent: "#8B3D4F" },
  },
  {
    slug: "gloss-nectar",
    name: "Gloss Néctar",
    tagline: "Brillo jugoso, no pegajoso",
    description:
      "Gloss transparente con un destello rosa. Hidrata y da volumen visual sin sensación de caramelo pegado.",
    howToUse:
      "Solo o sobre el Labial Satin Bloom. Reaplica después de comer; no mancha vasos en exceso.",
    ingredients: ["Aceite de ricino", "Ácido hialurónico", "Mentol suave"],
    category: "maquillaje",
    subcategory: "labios",
    price: 10,
    volume: "4 ml",
    stock: 19,
    visual: "gloss",
    palette: { from: "#F8DCE4", to: "#E8A8BC", accent: "#C45C78" },
  },
  {
    slug: "gel-limpiador-camelia",
    name: "Gel Limpiador Camelia",
    tagline: "Limpia el maquillaje sin tensar",
    description:
      "Gel de agua que disuelve protector solar y maquillaje ligero. Deja la piel limpia, no chirriante, incluso con agua dura.",
    howToUse:
      "Masajea sobre el rostro húmedo 30 segundos. Enjuaga con agua tibia. Usa de mañana y noche.",
    ingredients: ["Extracto de camelia", "Glicerina", "Pantenol"],
    category: "skincare",
    subcategory: "limpieza",
    price: 14,
    volume: "150 ml",
    stock: 17,
    featured: true,
    visual: "cleanser",
    palette: { from: "#E6F0EA", to: "#C5D9CE", accent: "#5A8A72" },
  },
  {
    slug: "tonico-niebla",
    name: "Tónico Niebla",
    tagline: "Equilibra y prepara la piel",
    description:
      "Tónico en spray con un toque de lavanda. Cierra el ritual de limpieza y prepara para sérums. Refresca a media tarde.",
    howToUse:
      "Rocía a 20 cm del rostro con los ojos cerrados. Deja absorber o sella con las palmas.",
    ingredients: ["Agua de hamamelis", "Niacinamida 4%", "Extracto de lavanda"],
    category: "skincare",
    subcategory: "limpieza",
    price: 13.5,
    volume: "100 ml",
    stock: 13,
    visual: "toner",
    palette: { from: "#E8E0F0", to: "#C9B8D8", accent: "#7A6898" },
  },
  {
    slug: "serum-vitamina-c-amanecer",
    name: "Sérum Vitamina C Amanecer",
    tagline: "Luminosidad y tono más parejo",
    description:
      "Sérum de vitamina C estable al 12%. Ayuda a unificar manchas del sol y a devolver brillo a piel apagada. Úsalo de día, siempre con protector.",
    howToUse:
      "3 o 4 gotas sobre piel limpia por la mañana. Espera un minuto y sigue con hidratante y SPF.",
    ingredients: ["Vitamina C 12%", "Ferúlico", "Vitamina E"],
    category: "skincare",
    subcategory: "tratamiento",
    price: 24,
    volume: "30 ml",
    stock: 4,
    featured: true,
    isNew: true,
    visual: "serum",
    palette: { from: "#F8E8C8", to: "#E8C878", accent: "#C49A2A" },
  },
  {
    slug: "contorno-ojos-rocio",
    name: "Contorno de Ojos Rocío",
    tagline: "Despierta la mirada",
    description:
      "Crema ligera para ojeras y líneas de expresión. Se absorbe rápido y no hace bolitas bajo el corrector.",
    howToUse:
      "Un grano de arroz por ojo, a toquecitos desde el lagrimal hacia afuera. Mañana y noche.",
    ingredients: ["Cafeína", "Péptidos", "Ácido hialurónico"],
    category: "skincare",
    subcategory: "tratamiento",
    price: 16.5,
    volume: "15 ml",
    stock: 12,
    visual: "eyecream",
    palette: { from: "#E4EEF4", to: "#C8D8E8", accent: "#6A8AAA" },
  },
  {
    slug: "mascarilla-flor-de-cerezo",
    name: "Mascarilla Flor de Cerezo",
    tagline: "15 minutos de calma y glow",
    description:
      "Mascarilla en tela impregnada con extracto de sakura. Ideal el domingo en casa o antes de maquillarte para un evento.",
    howToUse:
      "Sobre piel limpia, 10 a 15 minutos. Retira y masajea el resto. No enjuagues.",
    ingredients: ["Extracto de sakura", "Glicerina", "Alantoína"],
    category: "skincare",
    subcategory: "tratamiento",
    price: 11,
    volume: "25 ml",
    stock: 30,
    visual: "mask",
    palette: { from: "#F8DCE8", to: "#E8B8C8", accent: "#B87088" },
  },
  {
    slug: "crema-hidratante-nube",
    name: "Crema Hidratante Nube",
    tagline: "Textura nube, barrera reforzada",
    description:
      "Hidratante de gel-crema para piel mixta a seca. Alivia la tirantez del aire acondicionado y no deja brillo graso.",
    howToUse:
      "Una nuez sobre rostro y cuello, mañana y noche. Si tu piel es muy seca, sella con Aceite Facial Nocturno.",
    ingredients: ["Ceramidas", "Escualano", "Aloe vera"],
    category: "skincare",
    subcategory: "hidratacion",
    price: 19,
    volume: "50 ml",
    stock: 15,
    featured: true,
    visual: "cream",
    palette: { from: "#E8F0F4", to: "#D0E0E8", accent: "#7A9AAA" },
  },
  {
    slug: "aceite-facial-nocturno",
    name: "Aceite Facial Nocturno",
    tagline: "Nutrición profunda mientras duermes",
    description:
      "Blend de aceites secos que no deja película pesada. Recupera piel deshidratada por el sol o el maquillaje del día.",
    howToUse:
      "3 gotas sobre la hidratante, de noche. Evita el contorno de ojos si eres muy sensible.",
    ingredients: ["Aceite de rosa mosqueta", "Jojoba", "Squalane"],
    category: "skincare",
    subcategory: "hidratacion",
    price: 21,
    volume: "30 ml",
    stock: 8,
    visual: "oil",
    palette: { from: "#F0E4C8", to: "#D4C090", accent: "#8A7040" },
  },
  {
    slug: "protector-solar-petalo-spf50",
    name: "Protector Solar Pétalo SPF 50",
    tagline: "Filtro alto, sin residuo blanco",
    description:
      "SPF 50 de textura fluida, pensado para piel latina. No pica en los ojos y se lleva bien bajo la Base Bloom Velvet.",
    howToUse:
      "Dos dedos para rostro y cuello cada mañana. Reaplica cada dos horas si estás al sol. Último paso del skincare.",
    ingredients: ["Filtros orgánicos", "Niacinamida", "Extracto de té verde"],
    category: "skincare",
    subcategory: "proteccion",
    price: 17,
    volume: "50 ml",
    stock: 21,
    featured: true,
    visual: "sunscreen",
    palette: { from: "#F4EFE0", to: "#E4D8B8", accent: "#C4A050" },
  },
]

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured)
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter(
      (item) =>
        item.slug !== product.slug &&
        (item.subcategory === product.subcategory ||
          item.category === product.category)
    )
    .slice(0, limit)
}

export function subcategoryLabel(id: Subcategory) {
  return [...subcategories.maquillaje, ...subcategories.skincare].find(
    (item) => item.id === id
  )?.label
}
