export const shop = {
  name: "Bloom Shop",
  suffix: ".VE",
  fullName: "Bloom Shop.VE",
  tagline: "Maquillaje y skincare para tu ritual diario",
  description:
    "Catálogo de maquillaje y skincare en Venezuela. Elige tus favoritos y cierra el pedido por WhatsApp.",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "584120000000",
  instagram: "bloomshop.ve",
  email: "hola@bloomshop.ve",
  location: "Venezuela",
  currencyLabel: "USD",
} as const
