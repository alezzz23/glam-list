import type { AboutContent, FaqItem, HomeContent, Shop } from "@/lib/types"

export const defaultShop: Shop = {
  name: "Bloom Shop",
  suffix: ".VE",
  fullName: "Bloom Shop.VE",
  tagline: "Maquillaje y skincare para tu ritual diario",
  description:
    "Catálogo de maquillaje y skincare en Venezuela. Elige tus favoritos y cierra el pedido por WhatsApp.",
  footerText:
    "Boutique de maquillaje y skincare en Venezuela. Pedidos por WhatsApp, precios en dólares y envíos a todo el país.",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "584120000000",
  instagram: "bloomshop.ve",
  email: "hola@bloomshop.ve",
  location: "Caracas, Venezuela",
  hours: "Lunes a sábado, 9:00 a.m. – 6:00 p.m.",
  currencyLabel: "USD",
  logoUrl: "/logo.jpg",
}

export const defaultHome: HomeContent = {
  heroKicker: "Boutique · Venezuela",
  heroTitle: "Maquillaje y skincare que se siente como un ritual, no como una lista.",
  heroSubtitle:
    "Bloom Shop.VE reúne bases de glow, labiales mate y sérums que rinden en clima tropical. Eliges en el catálogo; el pedido se cierra por WhatsApp, con pago en dólares.",
  heroImage: "/images/hero-makeup.jpg",
  heroCaptionTitle: "Bloom, en serio.",
  heroCaptionText: "Piezas de diario, kits para regalar y stock que avisamos al instante.",
  highlights: [
    {
      title: "Catálogo real",
      text: "Stock a la vista. Si se agota, lo marcamos y puedes avisarnos.",
    },
    {
      title: "Tonos para el clima",
      text: "Bases, rubores y nudes pensados para pieles de Venezuela.",
    },
    {
      title: "Envío nacional",
      text: "Zoom, MRW o delivery. Coordinamos el envío en el mismo chat.",
    },
  ],
  collectionsEyebrow: "Colecciones",
  collectionsTitle: "Elige por ritual",
  featuredEyebrow: "Esta semana",
  featuredTitle: "Lo que más se está llevando",
  houseEyebrow: "La casa",
  houseTitle: "Una boutique, no un marketplace.",
  houseImage: "/images/glow-skin.jpg",
  houseParagraphs: [
    "Armamos el catálogo como se arma un tocador: pocas piezas, bien elegidas, con instrucciones claras. Si un tono no existe todavía, lo anotamos. Si un sérum se acaba, no lo escondemos.",
    "Los precios están en USD. Pagos por Zelle, pago móvil o transferencia, y el envío se acuerda en el chat — igual que en Instagram, con la diferencia de que aquí ves stock, fotos y total antes de escribir.",
  ],
  bestsellersTitle: "Favoritos de recompra",
  howEyebrow: "Cómo comprar",
  howTitle: "Tres pasos, sin pasarela rara.",
  howSteps: [
    {
      title: "Llena la bolsa",
      text: "Filtra por skincare, rostro, labios u ojos. Elige tono si el producto lo pide.",
    },
    {
      title: "Revisa el total",
      text: "En el carrito ves cantidades y USD. Agrega tu ciudad y una nota si hace falta.",
    },
    {
      title: "Escríbenos",
      text: "WhatsApp se abre con el pedido armado. Confirmamos stock, pago y envío.",
    },
  ],
  howCta: "Empezar a elegir",
}

export const defaultAbout: AboutContent = {
  eyebrow: "Nuestra historia",
  title: "Un estudio pequeño, un catálogo cuidado",
  paragraphs: [
    "Bloom Shop.VE nació en Caracas para reunir maquillaje y skincare que se sientan bien en el clima de aquí: humedad, sol y aire acondicionado. No somos una tienda de mil referencias; curamos una colección corta para que cada producto tenga un lugar en tu ritual.",
    "El nombre y la flor de cerezo del logo hablan de eso: algo que florece en su momento, con calma. Pedimos por WhatsApp porque así trabajamos la mayoría de los emprendimientos que nos gustan: con conversación, no con un checkout frío.",
    "Estamos en Caracas, Venezuela. Horario: Lunes a sábado, 9:00 a.m. – 6:00 p.m. Instagram: @bloomshop.ve.",
  ],
}

export const defaultFaqs: FaqItem[] = [
  {
    q: "¿Cómo hago un pedido?",
    a: "Elige productos en el catálogo, agrégalos a la bolsa y pulsa Pedir por WhatsApp. Confirmamos stock, total y datos de pago en el chat.",
  },
  {
    q: "¿En qué moneda están los precios?",
    a: "En dólares (USD). Al confirmar puedes pagar en USD, bolívares a la tasa del día, o USDT, según coordinemos.",
  },
  {
    q: "¿Hacen envíos fuera de Caracas?",
    a: "Sí. Caracas va por motorizado. El interior sale por encomienda; el costo se calcula según destino y peso del pedido.",
  },
  {
    q: "¿Puedo devolver un producto?",
    a: "Por higiene no aceptamos devolución de cosméticos abiertos. Si llegó dañado o equivocado, escríbenos el mismo día con fotos.",
  },
]
