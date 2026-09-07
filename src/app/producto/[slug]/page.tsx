import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductBuyBox } from "@/components/product-buy-box";
import { ProductCard } from "@/components/product-card";
import { ProductVisual } from "@/components/product-visual";
import { getProduct, products, relatedProducts } from "@/lib/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Producto" };
  return {
    title: product.name,
    description: product.tagline,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = relatedProducts(product);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm text-muted-foreground">
        <Link href="/catalogo" className="hover:text-[#A78BA5]">
          Catálogo
        </Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <ProductVisual
          vessel={product.vessel}
          colors={product.colors}
          className="aspect-square overflow-hidden rounded-[1.75rem] ring-1 ring-foreground/8"
        />
        <ProductBuyBox product={product} />
      </div>

      <div className="mt-12 grid gap-8 border-t border-foreground/8 pt-10 md:grid-cols-3">
        <section>
          <h2 className="font-heading text-xl">Descripción</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        </section>
        <section>
          <h2 className="font-heading text-xl">Cómo usarlo</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.howToUse}</p>
        </section>
        <section>
          <h2 className="font-heading text-xl">Ingredientes clave</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.ingredients}</p>
        </section>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="font-heading text-3xl">También te puede gustar</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
