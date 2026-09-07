export type Department = "maquillaje" | "skincare";

export type Category =
  | "labios"
  | "ojos"
  | "rostro"
  | "cejas"
  | "limpieza"
  | "hidratacion"
  | "tratamiento"
  | "proteccion";

export type Vessel =
  | "lipstick"
  | "gloss"
  | "palette"
  | "mascara"
  | "liner"
  | "compact"
  | "foundation"
  | "dropper"
  | "jar"
  | "pump"
  | "tube"
  | "mist";

export type Shade = {
  id: string;
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  howToUse: string;
  ingredients: string;
  price: number;
  department: Department;
  category: Category;
  vessel: Vessel;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  shades?: Shade[];
  featured?: boolean;
  isNew?: boolean;
  stock: number;
  volume: string;
};

export const CATEGORY_LABELS: Record<Category, string> = {
  labios: "Labios",
  ojos: "Ojos",
  rostro: "Rostro",
  cejas: "Cejas",
  limpieza: "Limpieza",
  hidratacion: "Hidratación",
  tratamiento: "Tratamiento",
  proteccion: "Protección",
};

export const DEPARTMENT_LABELS: Record<Department, string> = {
  maquillaje: "Maquillaje",
  skincare: "Skincare",
};

export const products: Product[] = [
  {
    id: "velvet-lip",
    slug: "velvet-lip-petal",
    name: "Velvet Lip Pétalo",
    tagline: "Mate sedoso que no reseca",
    description:
      "Labial mate de acabado aterciopelado. La fórmula con manteca de karité deja los labios cómodos durante horas, con un color intenso que no marca líneas.",
    howToUse:
      "Aplica desde el centro del labio hacia las comisuras. Para más definición, perfila antes con el delineador Ink Petal.",
    ingredients: "Manteca de karité, cera de candelilla, vitamina E, pigmentos minerales.",
    price: 12,
    department: "maquillaje",
    category: "labios",
    vessel: "lipstick",
    colors: { primary: "#C45C6A", secondary: "#F3D6D8", accent: "#7A3140" },
    shades: [
      { id: "petal", name: "Pétalo", hex: "#C45C6A" },
      { id: "guayaba", name: "Guayaba", hex: "#D06A5A" },
      { id: "cacao", name: "Cacao", hex: "#6B3A32" },
      { id: "nude", name: "Nude Caracas", hex: "#C49A86" },
    ],
    featured: true,
    stock: 18,
    volume: "3.5 g",
  },
  {
    id: "nectar-gloss",
    slug: "gloss-nectar",
    name: "Gloss Néctar",
    tagline: "Brillo jugoso, no pegajoso",
    description:
      "Gloss de efecto glass con un toque de vainilla. Hidrata y da volumen visual sin esa sensación pegajosa de los brillos tradicionales.",
    howToUse: "Usa solo o encima del labial para un acabado húmedo. Una capa basta.",
    ingredients: "Aceite de ricino, extracto de vainilla, tocoferol, mica.",
    price: 9,
    department: "maquillaje",
    category: "labios",
    vessel: "gloss",
    colors: { primary: "#E8A0B0", secondary: "#FBE7EC", accent: "#B35A72" },
    shades: [
      { id: "clear", name: "Rocío", hex: "#F7E6EA" },
      { id: "rose", name: "Rosa miel", hex: "#E8A0B0" },
      { id: "cherry", name: "Cereza", hex: "#C44A5E" },
    ],
    isNew: true,
    stock: 22,
    volume: "4 ml",
  },
  {
    id: "tinta-bloom",
    slug: "tinta-bloom",
    name: "Tinta Bloom",
    tagline: "Color que se queda",
    description:
      "Tinta acuosa de larga duración. Se funde con el labio y deja un tinte natural que aguanta comida, café y el calor de la ciudad.",
    howToUse:
      "Aplica una capa fina, espera 20 segundos y sella con los labios. Puedes construir intensidad.",
    ingredients: "Agua de rosas, glicerina, colorantes vegetales, aloe vera.",
    price: 8,
    department: "maquillaje",
    category: "labios",
    vessel: "tube",
    colors: { primary: "#B83A4C", secondary: "#F4D0D4", accent: "#6E1F2C" },
    shades: [
      { id: "coral", name: "Coral", hex: "#E06A5A" },
      { id: "berry", name: "Mora", hex: "#8A2A44" },
    ],
    stock: 14,
    volume: "5 ml",
  },
  {
    id: "sakura-palette",
    slug: "paleta-sakura",
    name: "Paleta Sakura",
    tagline: "Nueve sombras para el día y la noche",
    description:
      "Paleta de 9 tonos mate y satín inspirados en la flor de cerezo: rosados, malvas y un champán para iluminar el lagrimal. Pigmento cremoso que se difumina fácil.",
    howToUse:
      "Usa un mate en la cuenca, un satín en el párpado móvil y el champán en el lagrimal. Se puede aplicar con dedo o brocha.",
    ingredients: "Talco, mica, dimeticona, pigmentos, tocoferol.",
    price: 22,
    department: "maquillaje",
    category: "ojos",
    vessel: "palette",
    colors: { primary: "#D9A7B8", secondary: "#F3E6EA", accent: "#8A5A6E" },
    featured: true,
    isNew: true,
    stock: 11,
    volume: "9 × 1.2 g",
  },
  {
    id: "lash-bloom",
    slug: "mascara-lash-bloom",
    name: "Máscara Lash Bloom",
    tagline: "Pestañas en abanico, sin grumos",
    description:
      "Máscara de volumen que separa pestaña por pestaña. El cepillo en flor llega a las más cortas del lagrimal. Fórmula resistente a la humedad, fácil de desmaquillar.",
    howToUse: "Zigzag desde la raíz. Dos capas para el día, tres para la noche.",
    ingredients: "Cera de abeja, pantenol, pigmento negro, fibras de rayón.",
    price: 11,
    department: "maquillaje",
    category: "ojos",
    vessel: "mascara",
    colors: { primary: "#2C241E", secondary: "#E8D9D4", accent: "#C45C6A" },
    featured: true,
    stock: 26,
    volume: "8 ml",
  },
  {
    id: "ink-petal",
    slug: "delineador-ink-petal",
    name: "Delineador Ink Petal",
    tagline: "Trazo preciso, negro intenso",
    description:
      "Delineador líquido de punta pincel. Seca en segundos y no transfiere. Ideal para un trazo fino de diario o un wing marcado.",
    howToUse: "Apoya el codo, traza pegado a las pestañas y estira la cola hacia fuera.",
    ingredients: "Polímeros filmógenos, carbono, glicerina.",
    price: 8,
    department: "maquillaje",
    category: "ojos",
    vessel: "liner",
    colors: { primary: "#1A1412", secondary: "#EDE4DE", accent: "#A78BA5" },
    stock: 19,
    volume: "1.2 ml",
  },
  {
    id: "dew-drop",
    slug: "iluminador-dew-drop",
    name: "Iluminador Dew Drop",
    tagline: "Luz de rocío, no glitter",
    description:
      "Iluminador en crema con partículas ultrafinas. Da un destello húmedo en pómulos, arco de cupido y clavículas, sin partículas gruesas.",
    howToUse: "Toca con el dedo anular y funde sobre la piel hidratada o sobre base.",
    ingredients: "Squalane, mica, perla sintética, aceite de jojoba.",
    price: 14,
    department: "maquillaje",
    category: "rostro",
    vessel: "compact",
    colors: { primary: "#E8C9A8", secondary: "#F7EEE4", accent: "#C9A07A" },
    shades: [
      { id: "pearl", name: "Perla", hex: "#F0E4D4" },
      { id: "gold", name: "Oro suave", hex: "#E0B888" },
    ],
    stock: 9,
    volume: "6 g",
  },
  {
    id: "base-seda",
    slug: "base-seda",
    name: "Base Seda",
    tagline: "Cobertura media que se siente piel",
    description:
      "Base ligera de cobertura construible. Se funde con el tono y controla brillo en zona T sin resecar mejillas. Pensada para clima cálido.",
    howToUse:
      "Distribuye con esponja húmeda o brocha densa. Sella con el Polvo Nube si vas a estar mucho tiempo fuera.",
    ingredients: "Agua, niacinamida, ácido hialurónico, pigmentos tratados, SPF 15.",
    price: 18,
    department: "maquillaje",
    category: "rostro",
    vessel: "foundation",
    colors: { primary: "#D4B08A", secondary: "#F4E8DC", accent: "#8A6248" },
    shades: [
      { id: "01", name: "01 Marfil", hex: "#F0DCC8" },
      { id: "02", name: "02 Arena", hex: "#E0C09A" },
      { id: "03", name: "03 Canela", hex: "#C49468" },
      { id: "04", name: "04 Cacao", hex: "#8A5A3A" },
    ],
    featured: true,
    stock: 16,
    volume: "30 ml",
  },
  {
    id: "petal-cheek",
    slug: "rubor-petal-cheek",
    name: "Rubor Pétalo Cheek",
    tagline: "Color de flor en polvo fino",
    description:
      "Rubor en polvo prensado, pigmento suave que se construye. El tono se ve como un sonrojo natural, no como una mancha.",
    howToUse: "Toma poco producto, sopla la brocha y aplica en manzana de la mejilla hacia el pómulo.",
    ingredients: "Mica, óxidos de hierro, dimeticona, tocoferol.",
    price: 13,
    department: "maquillaje",
    category: "rostro",
    vessel: "compact",
    colors: { primary: "#E8A0A8", secondary: "#F8E4E6", accent: "#C46878" },
    shades: [
      { id: "blush", name: "Blush", hex: "#E8A0A8" },
      { id: "terracotta", name: "Terracota", hex: "#C47860" },
    ],
    stock: 13,
    volume: "5 g",
  },
  {
    id: "soft-cover",
    slug: "corrector-soft-cover",
    name: "Corrector Soft Cover",
    tagline: "Cubre ojeras sin cuartear",
    description:
      "Corrector cremoso con un punto de salmón para neutralizar ojeras. No se mete en líneas y aguanta el calor sin oxidarse de más.",
    howToUse: "Aplica en triángulo bajo el ojo y funde. Un toque en el centro del labio y aletas de la nariz.",
    ingredients: "Cera de ricino, cafeína, pigmentos, vitamina E.",
    price: 12,
    department: "maquillaje",
    category: "rostro",
    vessel: "tube",
    colors: { primary: "#E2C4A8", secondary: "#F6EBDF", accent: "#B08A6A" },
    shades: [
      { id: "light", name: "Claro", hex: "#EED8C0" },
      { id: "medium", name: "Medio", hex: "#D4B090" },
    ],
    stock: 15,
    volume: "8 ml",
  },
  {
    id: "polvo-nube",
    slug: "polvo-compacto-nube",
    name: "Polvo Compacto Nube",
    tagline: "Sella sin efecto tiza",
    description:
      "Polvo compacto translúcido-beige que mata brillo y deja un velo suave. Ideal para retoques en el bolso.",
    howToUse: "Presiona (no arrastres) sobre zona T y mentón. Usa la esponja del compacto o una brocha kabuki.",
    ingredients: "Sílice, mica, nylon-12, óxidos.",
    price: 15,
    department: "maquillaje",
    category: "rostro",
    vessel: "compact",
    colors: { primary: "#E8D4C4", secondary: "#F7F0EA", accent: "#B89A86" },
    stock: 10,
    volume: "9 g",
  },
  {
    id: "brow-bloom",
    slug: "lapiz-brow-bloom",
    name: "Lápiz Brow Bloom",
    tagline: "Cejas peinadas, no dibujadas",
    description:
      "Lápiz fino de 1.5 mm para pelos sueltos y un spoolie en el otro extremo. Fórmula cerosa que no se corre con sudor.",
    howToUse: "Peina hacia arriba, rellena huecos con trazos cortos y sella peinando de nuevo.",
    ingredients: "Cera de carnauba, pigmentos, aceite de ricino.",
    price: 9,
    department: "maquillaje",
    category: "cejas",
    vessel: "liner",
    colors: { primary: "#5A3C2E", secondary: "#E8D8CC", accent: "#3A241C" },
    shades: [
      { id: "soft", name: "Soft Brown", hex: "#7A5644" },
      { id: "deep", name: "Deep Brown", hex: "#3E2A22" },
    ],
    stock: 20,
    volume: "0.09 g",
  },
  {
    id: "gel-camelia",
    slug: "gel-limpiador-camelia",
    name: "Gel Limpiador Camelia",
    tagline: "Limpia sin tirantez",
    description:
      "Gel de pH 5.5 con extracto de camelia y glicerina. Retira protector solar y suciedad del día y deja la piel cómoda, no chirriante.",
    howToUse: "Humedece el rostro, masajea 30 segundos y enjuaga con agua tibia. Mañana y noche.",
    ingredients: "Agua, coco-glucósido, extracto de camelia, glicerina, alantoína.",
    price: 16,
    department: "skincare",
    category: "limpieza",
    vessel: "pump",
    colors: { primary: "#C9DCC8", secondary: "#EEF4EC", accent: "#7A9A78" },
    featured: true,
    stock: 21,
    volume: "150 ml",
  },
  {
    id: "micelar-rosa",
    slug: "agua-micelar-rosa",
    name: "Agua Micelar Rosa",
    tagline: "Desmaquilla en un solo paso",
    description:
      "Agua micelar con agua de rosas damascena. Quita maquillaje de ojos y labios sin ardor. No deja película jabonosa.",
    howToUse: "Empapa un algodón y desliza. En máscara waterproof, deja actuar 10 segundos.",
    ingredients: "Agua de rosas, poloxámero, pantenol, glicerina.",
    price: 14,
    department: "skincare",
    category: "limpieza",
    vessel: "mist",
    colors: { primary: "#E8C4C8", secondary: "#F8EEEE", accent: "#B87884" },
    stock: 17,
    volume: "200 ml",
  },
  {
    id: "serum-c",
    slug: "serum-vitamina-c-amanecer",
    name: "Serum Vitamina C Amanecer",
    tagline: "Luminosidad que se nota en dos semanas",
    description:
      "Serum de vitamina C 10% estable (etil-ascórbico) con ferúlico. Unifica el tono, suaviza manchas de sol y deja un glow sano. Envase opaco para proteger el activo.",
    howToUse: "2 o 3 gotas en rostro seco, cada mañana, antes de la crema y el SPF.",
    ingredients: "3-O-etil ascórbico, ácido ferúlico, niacinamida, hialurónico.",
    price: 24,
    department: "skincare",
    category: "tratamiento",
    vessel: "dropper",
    colors: { primary: "#F0C060", secondary: "#FBF3DC", accent: "#C49030" },
    featured: true,
    isNew: true,
    stock: 12,
    volume: "30 ml",
  },
  {
    id: "crema-petalo",
    slug: "crema-hidratante-petalo",
    name: "Crema Hidratante Pétalo",
    tagline: "Barrera cómoda para clima seco o A/C",
    description:
      "Crema gel con ceramidas y squalane. Hidrata sin pesadez: se absorbe y deja un velo suave que maquilla bien encima.",
    howToUse: "Noche siempre; mañana si tu piel está tirante. Una nuez para rostro y cuello.",
    ingredients: "Ceramidas NP, squalane, glicerina, extracto de rosa, pantenol.",
    price: 22,
    department: "skincare",
    category: "hidratacion",
    vessel: "jar",
    colors: { primary: "#E8B8C4", secondary: "#F8ECEF", accent: "#A86A7C" },
    featured: true,
    stock: 14,
    volume: "50 ml",
  },
  {
    id: "aceite-noche",
    slug: "aceite-facial-noche",
    name: "Aceite Facial Noche",
    tagline: "Nutrición de seda al despertar",
    description:
      "Blend de jojoba, rosa mosqueta y squalane. Repara la barrera mientras duermes. Unas gotas alcanzan para rostro y cuello.",
    howToUse: "Sobre la crema, 3 o 4 gotas. Presiona, no frotes. Evita el contorno si eres muy grasa.",
    ingredients: "Simmondsia chinensis, rosa mosqueta, squalane, vitamina E.",
    price: 26,
    department: "skincare",
    category: "tratamiento",
    vessel: "dropper",
    colors: { primary: "#C4A070", secondary: "#F4EBDC", accent: "#8A6840" },
    stock: 8,
    volume: "30 ml",
  },
  {
    id: "contorno-dew",
    slug: "contorno-ojos-dew",
    name: "Contorno de Ojos Dew",
    tagline: "Menos ojeras, más descanso",
    description:
      "Gel-crema con cafeína y péptidos. Alisa la zona, deshincha por la mañana y se lleva bien bajo el corrector.",
    howToUse: "Grano de arroz por ojo, con el anular, de dentro hacia fuera. Mañana y noche.",
    ingredients: "Cafeína, péptidos, niacinamida, hialurónico de bajo peso.",
    price: 18,
    department: "skincare",
    category: "tratamiento",
    vessel: "tube",
    colors: { primary: "#C8D4E0", secondary: "#EEF2F6", accent: "#7A90A8" },
    stock: 11,
    volume: "15 ml",
  },
  {
    id: "spf-glow",
    slug: "protector-solar-glow-spf50",
    name: "Protector Solar Glow SPF 50",
    tagline: "Filtro alto, acabado de piel sana",
    description:
      "SPF 50 de amplio espectro, textura fluida que no deja casta. Un glow sutil reemplaza al primer. Resistente a humedad ligera; reaplicar cada 2 horas al sol.",
    howToUse:
      "Dos dedos para rostro y cuello, último paso de la mañana. Si usas maquillaje, espera un minuto.",
    ingredients: "Filtros orgánicos, niacinamida, vitamina E, glicerina.",
    price: 19,
    department: "skincare",
    category: "proteccion",
    vessel: "tube",
    colors: { primary: "#F2D48A", secondary: "#FBF6E6", accent: "#C4A04A" },
    featured: true,
    isNew: true,
    stock: 23,
    volume: "50 ml",
  },
  {
    id: "sleep-mask",
    slug: "mascarilla-sleep-bloom",
    name: "Mascarilla Sleep Bloom",
    tagline: "Noche de spa, cara de domingo",
    description:
      "Mascarilla de noche con beta-glucano y ceramidas. Se deja puesta; al despertar la piel está plumping y suave.",
    howToUse: "Capa generosa 2 o 3 noches por semana, sobre el serum. No enjuagues.",
    ingredients: "Beta-glucano, ceramidas, glicerina, extracto de sakura.",
    price: 15,
    department: "skincare",
    category: "hidratacion",
    vessel: "jar",
    colors: { primary: "#D4C0E0", secondary: "#F3ECF6", accent: "#8A6A9A" },
    stock: 7,
    volume: "45 ml",
  },
  {
    id: "esencia-sakura",
    slug: "tonico-esencia-sakura",
    name: "Esencia Sakura",
    tagline: "El paso que prepara todo lo demás",
    description:
      "Tónico-esencia ligero con fermentos y agua de sakura. Restaura pH después de limpiar y ayuda a que serums penetren mejor.",
    howToUse: "Vierte en palmas y presiona sobre el rostro. No uses algodón: se absorbe mejor así.",
    ingredients: "Agua de sakura, fermento de galactomyces, pantenol, glicerina.",
    price: 17,
    department: "skincare",
    category: "hidratacion",
    vessel: "mist",
    colors: { primary: "#E8C8D4", secondary: "#F8F0F4", accent: "#B08094" },
    stock: 16,
    volume: "120 ml",
  },
  {
    id: "enzimatico",
    slug: "exfoliante-enzimatico",
    name: "Exfoliante Enzimático",
    tagline: "Piel lisa, sin granitos de azúcar",
    description:
      "Polvo enzimático de papaya y arroz que se activa con agua. Exfolia sin microplásticos ni rascado. Una o dos veces por semana.",
    howToUse: "Mezcla una cucharadita con agua, masajea 45 segundos y enjuaga. No uses el mismo día que ácidos.",
    ingredients: "Papaína, polvo de arroz, caolín, alantoína.",
    price: 16,
    department: "skincare",
    category: "limpieza",
    vessel: "jar",
    colors: { primary: "#E8D4B0", secondary: "#F7F0E4", accent: "#B89A68" },
    stock: 0,
    volume: "40 g",
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function featuredProducts() {
  return products.filter((product) => product.featured);
}

export function relatedProducts(product: Product, limit = 4) {
  return products
    .filter(
      (candidate) =>
        candidate.id !== product.id &&
        (candidate.category === product.category ||
          candidate.department === product.department),
    )
    .slice(0, limit);
}

export function makeupCategories(): Category[] {
  return ["labios", "ojos", "rostro", "cejas"];
}

export function skincareCategories(): Category[] {
  return ["limpieza", "hidratacion", "tratamiento", "proteccion"];
}
