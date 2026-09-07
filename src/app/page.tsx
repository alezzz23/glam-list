import { HeartHandshake, Leaf, ShieldCheck, Truck } from "lucide-react";
import { CartProvider } from "@/components/cart-provider";
import { CartSheet } from "@/components/cart-sheet";
import { Catalog } from "@/components/catalog";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const perks = [
  {
    icon: Leaf,
    title: "Cruelty free",
    text: "Ningún producto del catálogo se prueba en animales.",
  },
  {
    icon: ShieldCheck,
    title: "100% originales",
    text: "Compramos directo a laboratorios y distribuidores oficiales.",
  },
  {
    icon: Truck,
    title: "Envíos rápidos",
    text: "Despachamos en 24 h y te compartimos la guía por WhatsApp.",
  },
  {
    icon: HeartHandshake,
    title: "Asesoría personalizada",
    text: "Te ayudamos a armar tu rutina según tu tipo de piel.",
  },
];

export default function Home() {
  return (
    <CartProvider>
      <SiteHeader />
      <main className="flex-1">
        <Hero />

        <section className="border-y border-border bg-card/60">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
            {perks.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-3.5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="pt-16">
          <Catalog />
        </div>
      </main>
      <SiteFooter />
      <CartSheet />
    </CartProvider>
  );
}
