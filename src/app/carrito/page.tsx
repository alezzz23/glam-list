"use client"

import Link from "next/link"
import { MinusIcon, PlusIcon, ShoppingBagIcon, Trash2Icon } from "lucide-react"

import { ProductStage } from "@/components/product-visual"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart"
import { store, whatsappUrl } from "@/lib/config"
import { formatPrice } from "@/lib/format"

export default function CarritoPage() {
  const { items, subtotal, setQuantity, remove, clear, ready } = useCart()

  const message = [
    `Hola ${store.name}, quiero hacer este pedido:`,
    "",
    ...items.map(
      (item) =>
        `• ${item.quantity}× ${item.product.name} — ${formatPrice(item.product.price * item.quantity)}`
    ),
    "",
    `Total: ${formatPrice(subtotal)}`,
    "",
    "Quedo atenta a disponibilidad, envío y formas de pago.",
  ].join("\n")

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-heading text-4xl sm:text-5xl">Carrito</h1>
      <p className="mt-2 text-muted-foreground">
        Revisa tu pedido y confírmalo por WhatsApp. No cobramos en el sitio.
      </p>

      {!ready ? (
        <div className="mt-10 h-40 animate-pulse rounded-2xl bg-muted/70" />
      ) : items.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <ShoppingBagIcon className="mx-auto size-10 text-lavender" />
          <p className="mt-3 font-heading text-2xl">Tu carrito está vacío</p>
          <p className="mt-2 text-muted-foreground">
            Explora el catálogo y agrega lo que quieras pedir esta semana.
          </p>
          <Button className="mt-6 h-11 rounded-full px-6" render={<Link href="/catalogo" />}>
            Ir al catálogo
          </Button>
        </div>
      ) : (
        <>
          <ul className="mt-10 divide-y divide-border overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/8">
            {items.map(({ product, quantity }) => (
              <li
                key={product.slug}
                className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
              >
                <Link
                  href={`/producto/${product.slug}`}
                  className="size-24 shrink-0 overflow-hidden rounded-2xl ring-1 ring-foreground/8"
                >
                  <ProductStage
                    kind={product.visual}
                    from={product.palette.from}
                    to={product.palette.to}
                    accent={product.palette.accent}
                    className="h-full w-full"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/producto/${product.slug}`}
                    className="font-heading text-xl hover:underline"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(product.price)} c/u
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-full border border-border">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Quitar uno"
                      onClick={() => setQuantity(product.slug, quantity - 1)}
                    >
                      <MinusIcon />
                    </Button>
                    <span className="w-8 text-center text-sm">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Agregar uno"
                      onClick={() => setQuantity(product.slug, quantity + 1)}
                    >
                      <PlusIcon />
                    </Button>
                  </div>
                  <p className="w-20 text-right text-sm font-medium">
                    {formatPrice(product.price * quantity)}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Quitar ${product.name}`}
                    onClick={() => remove(product.slug)}
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-4 rounded-3xl bg-cream-deep p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Subtotal</p>
              <p className="font-heading text-3xl">{formatPrice(subtotal)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                El envío se cotiza al confirmar el pedido.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:min-w-56">
              <Button
                className="h-11 px-5 text-base"
                render={
                  <a
                    href={whatsappUrl(message)}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                Pedir por WhatsApp
              </Button>
              <Button variant="ghost" onClick={clear}>
                Vaciar carrito
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
