"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { formatUsd, stockLabel } from "@/lib/format";
import type { Product } from "@/lib/products";
import { consultProductMessage, whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function ProductBuyBox({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [shadeId, setShadeId] = useState(product.shades?.[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const soldOut = product.stock <= 0;

  const selectedShade = useMemo(
    () => product.shades?.find((shade) => shade.id === shadeId),
    [product.shades, shadeId],
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium tracking-[0.18em] text-[#A78BA5] uppercase">
          {product.department === "maquillaje" ? "Maquillaje" : "Skincare"} · {product.volume}
        </p>
        <h1 className="font-heading mt-2 text-3xl leading-tight sm:text-4xl">{product.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{product.tagline}</p>
        <p className="font-heading mt-4 text-3xl">{formatUsd(product.price)}</p>
        <p className="mt-1 text-sm text-muted-foreground">{stockLabel(product.stock)}</p>
      </div>

      {product.shades && product.shades.length > 0 && (
        <fieldset>
          <legend className="mb-2 text-sm font-medium">
            Tono{selectedShade ? `: ${selectedShade.name}` : ""}
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.shades.map((shade) => (
              <button
                key={shade.id}
                type="button"
                onClick={() => setShadeId(shade.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors",
                  shadeId === shade.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/15 hover:border-foreground/40",
                )}
              >
                <span
                  className="size-3.5 rounded-full ring-1 ring-black/10"
                  style={{ background: shade.hex }}
                />
                {shade.name}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-lg border border-foreground/15">
          <button
            type="button"
            className="px-3 py-2 text-lg"
            aria-label="Menos"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
          >
            −
          </button>
          <span className="w-8 text-center text-sm">{quantity}</span>
          <button
            type="button"
            className="px-3 py-2 text-lg"
            aria-label="Más"
            onClick={() => setQuantity((value) => Math.min(product.stock || 1, value + 1))}
          >
            +
          </button>
        </div>
        <Button
          size="lg"
          className="h-11 min-w-44 flex-1 sm:flex-none"
          disabled={soldOut}
          onClick={() => {
            addItem(product.id, { shadeId, quantity });
            toast.success(`${product.name} se agregó al pedido`);
          }}
        >
          {soldOut ? "Agotado" : "Agregar al pedido"}
        </Button>
      </div>

      <a
        className="text-sm text-[#A78BA5] underline-offset-4 hover:underline"
        href={whatsappUrl(consultProductMessage(product.name))}
        target="_blank"
        rel="noreferrer"
      >
        Preguntar por WhatsApp
      </a>
    </div>
  );
}
