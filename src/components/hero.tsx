import { ArrowDown, Leaf, MessageCircle, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductIllustration } from "@/components/product-illustration";
import { products } from "@/data/products";

const featured = [
  { id: "labial-terracota", className: "-rotate-6 translate-y-6" },
  { id: "serum-vitamina-c", className: "z-10 scale-110" },
  { id: "paleta-atardecer", className: "rotate-6 translate-y-8" },
];

const highlights = [
  { icon: Leaf, label: "Cruelty free" },
  { icon: Truck, label: "Envíos a todo el país" },
  { icon: MessageCircle, label: "Pedidos por WhatsApp" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-secondary/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 size-96 rounded-full bg-accent/60 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-2 lg:pt-24 lg:pb-28">
        <div className="max-w-xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-foreground uppercase">
            <span className="size-1.5 rounded-full bg-primary" />
            Maquillaje & skincare consciente
          </p>
          <h1 className="font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Tu piel, tu brillo,{" "}
            <em className="text-primary not-italic italic">tu ritual</em>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Maquillaje y cuidado facial seleccionados con cariño para realzar lo
            que ya eres. Fórmulas amables con tu piel, precios justos y entrega
            en la puerta de tu casa.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" className="rounded-full px-6" asChild>
              <a href="#catalogo">
                Ver catálogo
                <ArrowDown className="size-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-6" asChild>
              <a href="#skincare">Rutina de skincare</a>
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {highlights.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
              >
                <Icon className="size-4 text-primary" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto flex w-full max-w-md items-end justify-center lg:max-w-none">
          {featured.map(({ id, className }) => {
            const product = products.find((p) => p.id === id);
            if (!product) return null;
            return (
              <div
                key={id}
                className={`relative w-1/3 overflow-hidden rounded-3xl border border-white/60 shadow-xl shadow-primary/10 transition-transform duration-500 hover:scale-105 hover:rotate-0 ${className}`}
              >
                <ProductIllustration product={product} className="aspect-square w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
