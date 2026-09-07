"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";

export function QuickAdd({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (product.stock <= 0) {
    return (
      <Button variant="outline" size="sm" disabled>
        Agotado
      </Button>
    );
  }

  if (product.shades && product.shades.length > 0) {
    return (
      <Button variant="outline" size="sm" render={<Link href={`/producto/${product.slug}`} />}>
        Elegir tono
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      onClick={() => {
        addItem(product.id);
        setAdded(true);
        toast.success(`${product.name} se agregó al pedido`);
        window.setTimeout(() => setAdded(false), 1200);
      }}
    >
      {added ? "Agregado" : "Agregar"}
    </Button>
  );
}
