"use client"

import Link from "next/link"
import { MinusIcon, PlusIcon, ShoppingBagIcon, Trash2Icon } from "lucide-react"

import { ProductStage } from "@/components/product-visual"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCart } from "@/lib/cart"
import { store, whatsappUrl } from "@/lib/config"
import { formatPrice } from "@/lib/format"

export function CartSheet() {
  const { items, count, subtotal, setQuantity, remove } = useCart()

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
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Abrir carrito"
          />
        }
      >
        <ShoppingBagIcon />
        {count > 0 ? (
          <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1 text-[0.65rem]">
            {count}
          </Badge>
        ) : null}
      </SheetTrigger>
      <SheetContent className="bg-background sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading text-2xl">Tu carrito</SheetTitle>
          <SheetDescription>
            El pedido se confirma por WhatsApp. Precios en USD.
          </SheetDescription>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingBagIcon className="mb-3 size-10 text-lavender" />
            <p className="font-heading text-xl">Aún está vacío</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Agrega maquillaje o skincare y arma tu ritual.
            </p>
            <Button className="mt-5 h-10 px-5" render={<Link href="/catalogo" />}>
              Ver catálogo
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-4">
              <ul className="flex flex-col gap-4 pb-4">
                {items.map(({ product, quantity }) => (
                  <li key={product.slug} className="flex gap-3">
                    <div className="size-20 overflow-hidden rounded-xl ring-1 ring-foreground/8">
                      <ProductStage
                        kind={product.visual}
                        from={product.palette.from}
                        to={product.palette.to}
                        accent={product.palette.accent}
                        className="h-full w-full"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/producto/${product.slug}`}
                        className="font-heading text-base leading-tight hover:underline"
                      >
                        {product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(product.price)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center rounded-full border border-border">
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            aria-label="Quitar uno"
                            onClick={() => setQuantity(product.slug, quantity - 1)}
                          >
                            <MinusIcon />
                          </Button>
                          <span className="w-6 text-center text-sm">{quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            aria-label="Agregar uno"
                            onClick={() => setQuantity(product.slug, quantity + 1)}
                          >
                            <PlusIcon />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          aria-label={`Quitar ${product.name}`}
                          onClick={() => remove(product.slug)}
                        >
                          <Trash2Icon />
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
            <SheetFooter className="border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <Button
                className="h-11 w-full px-4 text-base"
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
              <Button
                variant="outline"
                className="h-10 w-full"
                render={<Link href="/carrito" />}
              >
                Ver carrito
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
