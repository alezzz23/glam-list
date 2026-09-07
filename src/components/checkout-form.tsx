"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MessageCircleIcon, Trash2Icon } from "lucide-react"

import { QuantityInput } from "@/components/quantity-input"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatPrice } from "@/lib/format"
import { getProductById } from "@/lib/products"
import { orderText, whatsappUrl } from "@/lib/whatsapp"

export function CheckoutForm() {
  const { lines, setQuantity, removeItem, subtotal, count, clear } = useCart()
  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [notes, setNotes] = useState("")

  if (count === 0) {
    return (
      <div className="rounded-3xl bg-card px-6 py-16 text-center ring-1 ring-foreground/8">
        <p className="font-heading text-3xl">Tu bolsa está vacía</p>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Aún no hay productos. Recorre el catálogo, agrega tus favoritos y aquí
          armamos el mensaje para WhatsApp.
        </p>
        <Button
          nativeButton={false}
          render={<Link href="/catalogo" />}
          className="mt-8 h-11 rounded-full"
        >
          Ir al catálogo
        </Button>
      </div>
    )
  }

  const message = orderText(lines, { name, city, notes })

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="space-y-4">
        <h2 className="font-heading text-2xl">Productos</h2>
        <ul className="space-y-4">
          {lines.map((line) => {
            const product = getProductById(line.productId)
            if (!product) return null
            const shade = product.shades?.find((item) => item.id === line.variantId)
            return (
              <li
                key={line.key}
                className="flex gap-4 rounded-3xl bg-card p-3 ring-1 ring-foreground/8 sm:p-4"
              >
                <Link
                  href={`/producto/${product.slug}`}
                  className="relative size-24 shrink-0 overflow-hidden rounded-2xl sm:size-28"
                >
                  <Image src={product.image} alt="" fill className="object-cover" sizes="112px" />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/producto/${product.slug}`} className="font-medium">
                        {product.name}
                      </Link>
                      {shade ? (
                        <p className="text-sm text-muted-foreground">Tono {shade.name}</p>
                      ) : null}
                    </div>
                    <p className="font-medium">{formatPrice(product.price * line.quantity)}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <QuantityInput
                      value={line.quantity}
                      max={product.stock}
                      onChange={(value) => setQuantity(line.key, value)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Quitar ${product.name}`}
                      onClick={() => removeItem(line.key)}
                    >
                      <Trash2Icon />
                    </Button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        <button type="button" className="text-sm text-muted-foreground underline-offset-4 hover:underline" onClick={clear}>
          Vaciar bolsa
        </button>
      </section>

      <aside className="h-fit space-y-5 rounded-3xl bg-card p-5 ring-1 ring-foreground/8 sm:p-6">
        <h2 className="font-heading text-2xl">Datos para el pedido</h2>
        <p className="text-sm text-muted-foreground">
          No cobramos aquí. WhatsApp abre con el resumen; coordinamos Zelle,
          pago móvil o transferencia, y el envío.
        </p>
        <label className="block space-y-1.5 text-sm">
          <span>Nombre</span>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Cómo te llamas"
            className="h-11 rounded-2xl"
          />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span>Ciudad o zona</span>
          <Input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Caracas, Maracaibo, Valencia…"
            className="h-11 rounded-2xl"
          />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span>Notas</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Tono, horario de delivery, si es regalo…"
            rows={3}
            className="w-full rounded-2xl border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </label>
        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="text-muted-foreground">Total</span>
          <span className="font-heading text-2xl">{formatPrice(subtotal)}</span>
        </div>
        <Button
          nativeButton={false}
          render={
            <a href={whatsappUrl(message)} target="_blank" rel="noreferrer" />
          }
          className="h-12 w-full rounded-full"
        >
          <MessageCircleIcon data-icon="inline-start" />
          Enviar pedido por WhatsApp
        </Button>
      </aside>
    </div>
  )
}
