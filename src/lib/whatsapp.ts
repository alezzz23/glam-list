export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP ?? "584120000000";

export function whatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function consultProductMessage(name: string) {
  return `Hola Bloom Shop.VE 🌸 Quiero consultar disponibilidad de ${name}.`;
}
