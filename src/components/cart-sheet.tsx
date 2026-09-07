"use client"

import Image from "next/image"
import Link from "next/link"
import type { ReactElement } from "react"
import { MessageCircleIcon, Trash2Icon } from "lucide-react"

import { QuantityInput } from "@/components/quantity-input"
import { useCart } from "@/components/cart-provider"
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
import { formatPrice } from "@/lib/format"
import { getProductById } from "@/lib/products"
import { orderText, whatsappUrl } from "@/lib/whatsapp"

export function CartSheet({ children }: { children: ReactElement }) {
  const { lines, setQuantity, removeItem, subtotal, count } = useCart()

  return (
    <Sheet>
      <SheetTrigger render={children} />
      <SheetContent className="w-full bg-background sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading text-2xl">Tu bolsa</SheetTitle>
          <SheetDescription>
            {count === 0
              ? "Todavía no hay productos. El catálogo está listo cuando quieras."
              : `${count} ${count === 1 ? "producto" : "productos"} · precios en USD`}
          </SheetDescription>
        </SheetHeader>
        {count === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-sm text-muted-foreground">
              Agrega un sérum, un labial o un kit y cierra el pedido por WhatsApp.
            </p>
            <Button
              nativeButton={false}
              render={<Link href="/catalogo" />}
              className="rounded-full"
            >
              Ver catálogo
            </Button>
          </div>
        ) : (
          <ScrollArea className="flex-1 px-4">
            <ul className="space-y-4 pb-4">
              {lines.map((line) => {
                const product = getProductById(line.productId)
                if (!product) return null
                const shade = product.shades?.find((item) => item.id === line.variantId)
                return (
                  <li key={line.key} className="flex gap-3">
                    <Link
                      href={`/producto/${product.slug}`}
                      className="relative size-20 shrink-0 overflow-hidden rounded-2xl"
                    >
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{product.name}</p>
                      {shade ? (
                        <p className="text-xs text-muted-foreground">{shade.name}</p>
                      ) : null}
                      <p className="mt-1 text-sm">{formatPrice(product.price)}</p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <QuantityInput
                          value={line.quantity}
                          max={product.stock}
                          onChange={(value) => setQuantity(line.key, value)}
                        />
                        <Button
                          variant="ghost"
                          size="icon-sm"
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
          </ScrollArea>
        )}
        {count > 0 ? (
          <SheetFooter className="border-t bg-secondary/40">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-heading text-xl">{formatPrice(subtotal)}</span>
            </div>
            <Button
              nativeButton={false}
              render={<Link href="/carrito" />}
              className="h-11 rounded-full"
            >
              Revisar pedido
            </Button>
            <Button
              nativeButton={false}
              render={
                <a
                  href={whatsappUrl(orderText(lines))}
                  target="_blank"
                  rel="noreferrer"
                />
              }
              variant="outline"
              className="h-11 rounded-full"
            >
              <MessageCircleIcon data-icon="inline-start" />
              Pedir por WhatsApp
            </Button>
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
