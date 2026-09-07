export const store = {
  name: "Bloom Shop.VE",
  tagline: "Maquillaje y skincare para tu ritual diario",
  city: "Caracas, Venezuela",
  hours: "Lunes a sábado, 9:00 a.m. – 6:00 p.m.",
  instagram: "bloomshop.ve",
  whatsapp: "584120000000",
  whatsappDisplay: "+58 412-0000000",
  currency: "USD",
} as const

export function whatsappUrl(text: string) {
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(text)}`
}
