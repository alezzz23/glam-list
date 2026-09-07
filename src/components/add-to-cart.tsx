"use client"

import { useState } from "react"
import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart"
import type { Product } from "@/lib/products"

export function AddToCart({ product }: { product: Product }) {
  const { add } = useCart()
  const [quantity, setQuantity] = useState(1)
  const soldOut = product.stock === 0
  const max = Math.max(product.stock, 1)

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex h-11 w-fit items-center rounded-full border border-border bg-card">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Quitar uno"
          disabled={soldOut || quantity <= 1}
          onClick={() => setQuantity((value) => Math.max(1, value - 1))}
        >
          <MinusIcon />
        </Button>
        <span className="w-8 text-center text-sm">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Agregar uno"
          disabled={soldOut || quantity >= max}
          onClick={() => setQuantity((value) => Math.min(max, value + 1))}
        >
          <PlusIcon />
        </Button>
      </div>
      <Button
        className="h-11 flex-1 px-6 text-base sm:flex-none sm:min-w-52"
        disabled={soldOut}
        onClick={() => add(product.slug, quantity)}
      >
        {soldOut ? "Agotado" : "Agregar al carrito"}
      </Button>
    </div>
  )
}
