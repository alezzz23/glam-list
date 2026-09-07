"use client";

import { Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductIllustration } from "@/components/product-illustration";
import { useCart } from "@/components/cart-provider";
import { CATEGORY_LABELS, type Product } from "@/data/products";
import { formatPrice } from "@/lib/format";

const badgeStyles: Record<NonNullable<Product["badge"]>, string> = {
  Nuevo: "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Más vendido": "bg-amber-100 text-amber-900 border-amber-200",
  Oferta: "bg-rose-100 text-rose-800 border-rose-200",
};

export function ProductCard({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (product: Product) => void;
}) {
  const { add, setOpen } = useCart();

  const handleAdd = () => {
    add(product.id);
    toast.success(`${product.name} agregado al carrito`, {
      action: { label: "Ver carrito", onClick: () => setOpen(true) },
    });
  };

  return (
    <Card className="group overflow-hidden rounded-3xl border-border/80 py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
      <button
        type="button"
        onClick={() => onSelect(product)}
        className="relative block w-full cursor-pointer text-left"
        aria-label={`Ver detalles de ${product.name}`}
      >
        <ProductIllustration
          product={product}
          className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {product.badge && (
          <Badge
            variant="outline"
            className={`absolute top-3 left-3 border ${badgeStyles[product.badge]}`}
          >
            {product.badge}
          </Badge>
        )}
      </button>

      <CardContent className="flex flex-col gap-3 p-5 pt-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {CATEGORY_LABELS[product.category]}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            {product.rating.toFixed(1)}
            <span className="text-muted-foreground/70">({product.reviews})</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => onSelect(product)}
          className="cursor-pointer text-left"
        >
          <h3 className="font-display text-lg leading-snug font-semibold">
            {product.name}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
            {product.tagline}
          </p>
        </button>

        <div className="mt-1 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <Button size="sm" className="rounded-full" onClick={handleAdd}>
            <Plus className="size-4" />
            Agregar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
