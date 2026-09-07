"use client";

import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ProductIllustration } from "@/components/product-illustration";
import { useCart } from "@/components/cart-provider";
import { CATEGORY_LABELS, type Product } from "@/data/products";
import { formatPrice } from "@/lib/format";

function ProductDialogBody({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { add, setOpen } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    add(product.id, quantity);
    toast.success(`${quantity} × ${product.name} agregado al carrito`, {
      action: { label: "Ver carrito", onClick: () => setOpen(true) },
    });
    onClose();
  };

  return (
    <div className="grid sm:grid-cols-2">
      <div className="relative">
        <ProductIllustration
          product={product}
          className="aspect-square w-full sm:h-full sm:min-h-full"
        />
        {product.badge && (
          <Badge className="absolute top-4 left-4 bg-card/90 text-foreground backdrop-blur-sm">
            {product.badge}
          </Badge>
        )}
      </div>

      <div className="flex flex-col p-6 sm:p-7">
        <DialogHeader className="text-left">
          <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {CATEGORY_LABELS[product.category]}
          </span>
          <DialogTitle className="font-display text-2xl leading-tight">
            {product.name}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-1.5 pt-1">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            <span className="font-medium text-foreground">
              {product.rating.toFixed(1)}
            </span>
            <span>· {product.reviews} reseñas</span>
          </DialogDescription>
        </DialogHeader>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <ul className="mt-4 space-y-2">
          {product.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              {benefit}
            </li>
          ))}
        </ul>

        <div className="mt-4 rounded-2xl bg-secondary/60 p-3.5">
          <p className="text-xs font-semibold tracking-wide text-secondary-foreground uppercase">
            Modo de uso
          </p>
          <p className="mt-1 text-sm leading-relaxed text-secondary-foreground">
            {product.usage}
          </p>
        </div>

        <Separator className="my-5" />

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 rounded-full border border-border p-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-full"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Disminuir cantidad"
            >
              <Minus className="size-4" />
            </Button>
            <span className="w-8 text-center text-sm font-semibold tabular-nums">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-full"
              onClick={() => setQuantity((q) => Math.min(99, q + 1))}
              aria-label="Aumentar cantidad"
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </div>

        <Button size="lg" className="mt-4 w-full rounded-full" onClick={handleAdd}>
          <ShoppingBag className="size-4" />
          Agregar {quantity > 1 ? `${quantity} ` : ""}al carrito ·{" "}
          {formatPrice(product.price * quantity)}
        </Button>
      </div>
    </div>
  );
}

export function ProductDialog({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={product !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl p-0 sm:max-w-3xl">
        {product && (
          <ProductDialogBody
            key={product.id}
            product={product}
            onClose={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
