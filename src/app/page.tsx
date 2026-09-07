import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon, Flower2Icon, SparklesIcon, TruckIcon } from "lucide-react"

import { ProductGrid } from "@/components/product-card"
import { SakuraWatermark } from "@/components/product-visual"
import { Button } from "@/components/ui/button"
import { store } from "@/lib/config"
import { categories, getFeaturedProducts } from "@/lib/products"

export default function HomePage() {
  const featured = getFeaturedProducts()

  return (
    <div>
      <section className="relative overflow-hidden">
        <SakuraWatermark className="pointer-events-none absolute -left-10 top-8 size-48 opacity-30" />
        <SakuraWatermark className="pointer-events-none absolute right-[-2rem] bottom-4 size-36 opacity-20" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <p className="text-xs tracking-[0.28em] text-lavender uppercase">
              Caracas · {store.name}
            </p>
            <h1 className="mt-4 font-heading text-5xl leading-[0.95] text-espresso sm:text-6xl lg:text-7xl">
              Belleza que
              <span className="block italic">florece contigo</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Catálogo de maquillaje y skincare pensado para el clima venezolano.
              Elige tus esenciales, arma el carrito y confirma el pedido por
              WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                className="h-11 rounded-full px-6 text-base"
                render={<Link href="/catalogo" />}
              >
                Ver catálogo
                <ArrowRightIcon />
              </Button>
              <Button
                variant="outline"
                className="h-11 rounded-full px-6 text-base"
                render={<Link href="/catalogo?categoria=skincare" />}
              >
                Ritual de skincare
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-8 rounded-full bg-blossom/50 blur-3xl" />
            <Image
              src="/logo.jpg"
              alt="Logo de Bloom Shop.VE, flor de cerezo con la letra b"
              width={1024}
              height={1024}
              priority
              className="relative rounded-[2rem] shadow-[0_30px_80px_-40px_rgba(47,39,35,0.45)] ring-1 ring-foreground/10"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-cream-deep/70">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
          {[
            {
              icon: SparklesIcon,
              title: "Fórmulas suaves",
              copy: "Texturas que se sienten ligeras y colores que se ven en piel real.",
            },
            {
              icon: TruckIcon,
              title: "Envío nacional",
              copy: "Caracas en motorizado; interior por encomienda. Te cotizamos al confirmar.",
            },
            {
              icon: Flower2Icon,
              title: "Pedido por WhatsApp",
              copy: "Sin cuenta ni pasarela: armas el carrito y nos escribes con un toque.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-3">
              <item.icon className="mt-0.5 size-5 text-lavender" />
              <div>
                <h2 className="font-heading text-xl">{item.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.22em] text-lavender uppercase">
              Colección
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl">Dos líneas, un ritual</h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/catalogo?categoria=${category.id}`}
              className="group relative overflow-hidden rounded-3xl bg-card p-8 ring-1 ring-foreground/8 transition hover:-translate-y-0.5 hover:shadow-[0_16px_50px_-30px_rgba(47,39,35,0.4)] md:min-h-56"
            >
              <SakuraWatermark className="absolute right-2 -bottom-6 size-32 opacity-20 transition group-hover:opacity-35" />
              <p className="text-xs tracking-[0.2em] text-lavender uppercase">
                {category.id === "maquillaje" ? "Color" : "Cuidado"}
              </p>
              <h3 className="mt-3 font-heading text-4xl">{category.label}</h3>
              <p className="mt-3 max-w-sm text-muted-foreground">
                {category.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium">
                Ver productos
                <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.22em] text-lavender uppercase">
              Lo más pedido
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl">Destacados de la semana</h2>
          </div>
          <Button variant="outline" className="rounded-full" render={<Link href="/catalogo" />}>
            Ver todo
          </Button>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section className="bg-espresso text-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Elige",
              copy: "Filtra por maquillaje o skincare y abre cada producto para ver usos e ingredientes.",
            },
            {
              step: "02",
              title: "Arma el carrito",
              copy: "Ajusta cantidades. El carrito se guarda en este dispositivo si cierras la pestaña.",
            },
            {
              step: "03",
              title: "Escríbenos",
              copy: "Pedir por WhatsApp arma el mensaje con tu lista. Coordinamos pago y envío ahí mismo.",
            },
          ].map((item) => (
            <div key={item.step}>
              <p className="font-heading text-4xl text-blossom">{item.step}</p>
              <h3 className="mt-2 font-heading text-3xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/75">
                {item.copy}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
