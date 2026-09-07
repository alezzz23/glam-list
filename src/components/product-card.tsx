import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ProductVisual } from "@/components/product-visual";
import { QuickAdd } from "@/components/quick-add";
import { formatUsd, stockLabel } from "@/lib/format";
import { CATEGORY_LABELS, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock <= 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/8 transition-shadow hover:shadow-[0_12px_40px_-18px_rgba(44,36,30,0.28)]">
      <Link href={`/producto/${product.slug}`} className="relative block">
        <ProductVisual
          vessel={product.vessel}
          colors={product.colors}
          className="aspect-[4/5] w-full"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.isNew && (
            <Badge className="bg-[#A78BA5] text-white">Nuevo</Badge>
          )}
          {soldOut && <Badge variant="secondary">Agotado</Badge>}
          {!soldOut && product.stock <= 8 && (
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
              {stockLabel(product.stock)}
            </Badge>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <p className="text-[11px] font-medium tracking-[0.16em] text-[#A78BA5] uppercase">
            {CATEGORY_LABELS[product.category]}
          </p>
          <Link href={`/producto/${product.slug}`} className="mt-1 block">
            <h3 className="font-heading text-lg leading-snug text-foreground group-hover:underline group-hover:decoration-[#E8B8BC] group-hover:underline-offset-4">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
        </div>
        <div className="flex items-end justify-between gap-3">
          <p className="font-heading text-xl">{formatUsd(product.price)}</p>
          <QuickAdd product={product} />
        </div>
      </div>
    </article>
  );
}
