"use client"

import { useState } from "react"
import { MessageCircleIcon, ShoppingBagIcon } from "lucide-react"

import { QuantityInput } from "@/components/quantity-input"
import { useCart } from "@/components/cart-provider"
import { buttonVariants } from "@/components/ui/button"
import { formatPrice, formatStock } from "@/lib/format"
import type { Product } from "@/lib/products"
import { productInquiryText, whatsappUrl } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

export function ProductPurchase({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [shadeId, setShadeId] = useState(product.shades?.[0]?.id)
  const [quantity, setQuantity] = useState(1)
  const soldOut = product.stock <= 0
  const selectedShade = product.shades?.find((shade) => shade.id === shadeId)

  return (
    <div className="space-y-6">
      {product.shades?.length ? (
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium">
            Tono{selectedShade ? `: ${selectedShade.name}` : ""}
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.shades.map((shade) => (
              <button
                key={shade.id}
                type="button"
                onClick={() => setShadeId(shade.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-colors",
                  shadeId === shade.id
                    ? "border-primary bg-secondary"
                    : "border-border hover:border-primary/40"
                )}
              >
                <span
                  className="size-4 rounded-full ring-1 ring-foreground/15"
                  style={{ backgroundColor: shade.hex }}
                />
                {shade.name}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <QuantityInput
          value={quantity}
          max={Math.max(product.stock, 1)}
          onChange={setQuantity}
        />
        <p className="text-sm text-muted-foreground">{formatStock(product.stock)}</p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          className={cn(buttonVariants(), "h-11 flex-1 rounded-full")}
          disabled={soldOut}
          onClick={() => addItem(product.id, quantity, shadeId)}
        >
          <ShoppingBagIcon className="size-4" />
          {soldOut ? "Agotado" : `Agregar · ${formatPrice(product.price * quantity)}`}
        </button>
        <a
          href={whatsappUrl(productInquiryText(product.name, selectedShade?.name))}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: "outline" }), "h-11 rounded-full")}
        >
          <MessageCircleIcon className="size-4" />
          Consultar
        </a>
      </div>
    </div>
  )
}
