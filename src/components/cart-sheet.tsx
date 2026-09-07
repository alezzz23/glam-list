"use client";

import Link from "next/link";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProductVisual } from "@/components/product-visual";
import { shadeForLine, useCart } from "@/lib/cart-context";
import { formatUsd } from "@/lib/format";
import { getProductById } from "@/lib/products";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CartSheet({ open, onOpenChange }: Props) {
  const { lines, setQuantity, removeItem, subtotal, itemCount } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-[#FBF7F2] p-0 sm:max-w-md">
        <SheetHeader className="border-b border-foreground/8">
          <SheetTitle className="font-heading text-xl">Tu pedido</SheetTitle>
          <SheetDescription>
            {itemCount === 0
              ? "Aún no has elegido productos."
              : `${itemCount} ${itemCount === 1 ? "producto" : "productos"} listos para WhatsApp.`}
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-muted-foreground">El catálogo te está esperando.</p>
            <Button
              render={<Link href="/catalogo" onClick={() => onOpenChange(false)} />}
            >
              Ver catálogo
            </Button>
          </div>
        ) : (
          <ScrollArea className="flex-1 px-4">
            <ul className="flex flex-col gap-4 py-2">
              {lines.map((line) => {
                const product = getProductById(line.productId);
                if (!product) return null;
                const shade = shadeForLine(line.productId, line.shadeId);
                return (
                  <li
                    key={`${line.productId}-${line.shadeId ?? "default"}`}
                    className="flex gap-3"
                  >
                    <ProductVisual
                      vessel={product.vessel}
                      colors={product.colors}
                      className="size-16 shrink-0 overflow-hidden rounded-xl"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{product.name}</p>
                      {shade && (
                        <p className="text-xs text-muted-foreground">{shade.name}</p>
                      )}
                      <p className="mt-0.5 text-sm">{formatUsd(product.price)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon-xs"
                          aria-label="Quitar uno"
                          onClick={() =>
                            setQuantity(line.productId, line.shadeId, line.quantity - 1)
                          }
                        >
                          <MinusIcon />
                        </Button>
                        <span className="w-5 text-center text-sm">{line.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon-xs"
                          aria-label="Agregar uno"
                          onClick={() =>
                            setQuantity(line.productId, line.shadeId, line.quantity + 1)
                          }
                        >
                          <PlusIcon />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Eliminar"
                          className="ml-auto"
                          onClick={() => removeItem(line.productId, line.shadeId)}
                        >
                          <Trash2Icon />
                        </Button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        )}

        {lines.length > 0 && (
          <SheetFooter className="border-t border-foreground/8">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-heading text-lg">{formatUsd(subtotal)}</span>
            </div>
            <Button
              size="lg"
              className="h-11 w-full"
              render={<Link href="/carrito" onClick={() => onOpenChange(false)} />}
            >
              Confirmar pedido
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
