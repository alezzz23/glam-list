import type { CartLine } from "@/lib/cart"
import { formatPrice } from "@/lib/format"
import { getProductById } from "@/lib/products"
import { shop } from "@/lib/shop"

export function whatsappUrl(text: string) {
  const phone = shop.whatsapp.replace(/\D/g, "")
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

export function productInquiryText(name: string, shadeName?: string) {
  const shade = shadeName ? ` en el tono ${shadeName}` : ""
  return `Hola, quiero consultar por *${name}*${shade} en ${shop.fullName}. ¿Lo tienen disponible?`
}

export function orderText(lines: CartLine[], extras?: { name?: string; city?: string; notes?: string }) {
  const items = lines
    .map((line) => {
      const product = getProductById(line.productId)
      if (!product) return null
      const shade = product.shades?.find((item) => item.id === line.variantId)
      const label = shade ? `${product.name} (${shade.name})` : product.name
      const subtotal = formatPrice(product.price * line.quantity)
      return `• ${line.quantity}× ${label} — ${subtotal}`
    })
    .filter(Boolean)
    .join("\n")

  const total = lines.reduce((sum, line) => {
    const product = getProductById(line.productId)
    return sum + (product ? product.price * line.quantity : 0)
  }, 0)

  const header = `Hola, quiero hacer este pedido en ${shop.fullName}:\n\n${items}\n\n*Total: ${formatPrice(total)}*`
  const who = extras?.name ? `\nNombre: ${extras.name}` : ""
  const city = extras?.city ? `\nCiudad / zona: ${extras.city}` : ""
  const notes = extras?.notes ? `\nNotas: ${extras.notes}` : ""

  return `${header}${who}${city}${notes}\n\nQuedo atenta/o para coordinar pago y envío.`
}
