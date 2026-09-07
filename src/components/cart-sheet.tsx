"use client";

import { MessageCircle, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProductIllustration } from "@/components/product-illustration";
import { useCart } from "@/components/cart-provider";
import { products, type Product } from "@/data/products";
import { formatPrice } from "@/lib/format";

export function CartSheet() {
  const {
    items,
    isOpen,
    setOpen,
    setQuantity,
    remove,
    clear,
    subtotal,
    checkoutUrl,
  } = useCart();

  const detailed = items
    .map((item) => ({
      item,
      product: products.find((p) => p.id === item.productId),
    }))
    .filter(
      (entry): entry is { item: (typeof items)[number]; product: Product } =>
        entry.product !== undefined
    );

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-md" side="right">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">Tu carrito</SheetTitle>
          <SheetDescription>
            {detailed.length === 0
              ? "Aún no agregas productos."
              : "Revisa tu pedido y finalízalo por WhatsApp."}
          </SheetDescription>
        </SheetHeader>

        {detailed.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="size-7 text-secondary-foreground" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold">
                Tu carrito está vacío
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Explora el catálogo y agrega tus favoritos para armar tu pedido.
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => setOpen(false)}
            >
              Seguir explorando
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-4">
              {detailed.map(({ item, product }) => (
                <div
                  key={item.productId}
                  className="flex gap-3 rounded-2xl border border-border/70 bg-card p-3"
                >
                  <div className="size-20 shrink-0 overflow-hidden rounded-xl">
                    <ProductIllustration
                      product={product}
                      className="size-full"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-sm font-semibold">
                        {product.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => remove(item.productId)}
                        className="cursor-pointer text-muted-foreground transition-colors hover:text-destructive"
                        aria-label={`Quitar ${product.name}`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(product.price)} c/u
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 rounded-full border border-border p-0.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-6 rounded-full"
                          onClick={() =>
                            setQuantity(item.productId, item.quantity - 1)
                          }
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="size-3" />
                        </Button>
                        <span className="w-6 text-center text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-6 rounded-full"
                          onClick={() =>
                            setQuantity(item.productId, item.quantity + 1)
                          }
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="size-3" />
                        </Button>
                      </div>
                      <span className="text-sm font-bold">
                        {formatPrice(product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={clear}
                className="cursor-pointer text-xs font-medium text-muted-foreground underline-offset-2 hover:text-destructive hover:underline"
              >
                Vaciar carrito
              </button>
            </div>

            <SheetFooter className="border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-xl font-bold">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                El costo de envío se confirma por WhatsApp según tu zona.
              </p>
              <Button size="lg" className="w-full rounded-full" asChild>
                <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" />
                  Finalizar pedido por WhatsApp
                </a>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
