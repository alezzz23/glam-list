"use client"

import Image from "next/image"
import Link from "next/link"
import { cloneElement, useState, type ReactElement } from "react"
import { MessageCircleIcon, Trash2Icon, XIcon } from "lucide-react"

import { Drawer } from "@/components/drawer"
import { QuantityInput } from "@/components/quantity-input"
import { useCart } from "@/components/cart-provider"
import { buttonVariants } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"
import { getProductById } from "@/lib/products"
import { cn } from "@/lib/utils"
import { orderText, whatsappUrl } from "@/lib/whatsapp"

export function CartSheet({ children }: { children: ReactElement<{ onClick?: (event: unknown) => void }> }) {
  const { lines, setQuantity, removeItem, subtotal, count } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <>
      {cloneElement(children, {
        onClick: (event: unknown) => {
          children.props.onClick?.(event)
          setOpen(true)
        },
      })}
      <Drawer open={open} onOpenChange={setOpen} side="right">
        <div className="flex items-start justify-between gap-3 p-4">
          <div>
            <p className="font-heading text-2xl">Tu bolsa</p>
            <p className="text-sm text-muted-foreground">
              {count === 0
                ? "Todavía no hay productos."
                : `${count} ${count === 1 ? "producto" : "productos"} · precios en USD`}
            </p>
          </div>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
            aria-label="Cerrar bolsa"
            onClick={() => setOpen(false)}
          >
            <XIcon />
          </button>
        </div>
        {count === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-sm text-muted-foreground">
              Agrega un sérum, un labial o un kit y cierra el pedido por WhatsApp.
            </p>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants(), "h-10 rounded-full px-4")}
            >
              Ver catálogo
            </Link>
          </div>
        ) : (
          <ul className="flex-1 space-y-4 overflow-y-auto px-4 pb-4">
            {lines.map((line) => {
              const product = getProductById(line.productId)
              if (!product) return null
              const shade = product.shades?.find((item) => item.id === line.variantId)
              return (
                <li key={line.key} className="flex gap-3">
                  <Link
                    href={`/producto/${product.slug}`}
                    onClick={() => setOpen(false)}
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
                    {shade ? <p className="text-xs text-muted-foreground">{shade.name}</p> : null}
                    <p className="mt-1 text-sm">{formatPrice(product.price)}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <QuantityInput
                        value={line.quantity}
                        max={product.stock}
                        onChange={(value) => setQuantity(line.key, value)}
                      />
                      <button
                        type="button"
                        className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
                        aria-label={`Quitar ${product.name}`}
                        onClick={() => removeItem(line.key)}
                      >
                        <Trash2Icon />
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
        {count > 0 ? (
          <div className="mt-auto space-y-2 border-t bg-secondary/40 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-heading text-xl">{formatPrice(subtotal)}</span>
            </div>
            <Link
              href="/carrito"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants(), "flex h-11 rounded-full")}
            >
              Revisar pedido
            </Link>
            <a
              href={whatsappUrl(orderText(lines))}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "flex h-11 rounded-full")}
            >
              <MessageCircleIcon className="size-4" />
              Pedir por WhatsApp
            </a>
          </div>
        ) : null}
      </Drawer>
    </>
  )
}
