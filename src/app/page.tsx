import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon, MessageCircleIcon, PackageIcon, SparklesIcon, TruckIcon } from "lucide-react"

import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { categories, getBestsellers, getFeaturedProducts } from "@/lib/products"
import { shop } from "@/lib/shop"
import { whatsappUrl } from "@/lib/whatsapp"

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 4)
  const bestsellers = getBestsellers().slice(0, 3)

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="space-y-6">
            <p className="text-xs tracking-[0.28em] text-lavender uppercase">
              Boutique · Venezuela
            </p>
            <h1 className="font-heading max-w-xl text-4xl leading-[1.1] text-balance sm:text-5xl lg:text-6xl">
              Maquillaje y skincare que se siente como un ritual, no como una lista.
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              {shop.fullName} reúne bases de glow, labiales mate y sérums que
              rinden en clima tropical. Eliges en el catálogo; el pedido se
              cierra por WhatsApp, con pago en dólares.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                nativeButton={false}
                render={<Link href="/catalogo" />}
                className="h-12 rounded-full px-6 text-base"
              >
                Ver catálogo
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
              <Button
                nativeButton={false}
                render={
                  <a
                    href={whatsappUrl(`Hola, quiero ver novedades de ${shop.fullName}`)}
                    target="_blank"
                    rel="noreferrer"
                  />
                }
                variant="outline"
                className="h-12 rounded-full px-6 text-base"
              >
                <MessageCircleIcon data-icon="inline-start" />
                Pedir por WhatsApp
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-blush/50 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-foreground/10">
              <Image
                src="/images/hero-makeup.jpg"
                alt="Mesa con maquillaje y brochas"
                width={900}
                height={720}
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-foreground/55 to-transparent p-5 text-primary-foreground">
                <p className="font-heading text-2xl">Bloom, en serio.</p>
                <p className="text-sm text-primary-foreground/80">
                  Piezas de diario, kits para regalar y stock que avisamos al instante.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: PackageIcon,
              title: "Catálogo real",
              text: "Stock a la vista. Si se agota, lo marcamos y puedes avisarnos.",
            },
            {
              icon: SparklesIcon,
              title: "Tonos para el clima",
              text: "Bases, rubores y nudes pensados para pieles de Venezuela.",
            },
            {
              icon: TruckIcon,
              title: "Envío nacional",
              text: "Zoom, MRW o delivery. Coordinamos el envío en el mismo chat.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex gap-3 rounded-3xl bg-card p-4 ring-1 ring-foreground/8"
            >
              <item.icon className="mt-0.5 size-5 text-lavender" />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Colecciones</p>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl">Elige por ritual</h2>
          </div>
          <Link href="/catalogo" className="hidden text-sm underline-offset-4 hover:underline sm:inline">
            Ver todo
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/catalogo?categoria=${category.id}`}
              className="group relative overflow-hidden rounded-3xl ring-1 ring-foreground/10"
            >
              <Image
                src={category.image}
                alt=""
                width={400}
                height={500}
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-foreground/70 via-foreground/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-primary-foreground">
                <p className="font-heading text-xl">{category.name}</p>
                <p className="mt-1 line-clamp-2 text-xs text-primary-foreground/80">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-8">
          <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Esta semana</p>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl">Lo que más se está llevando</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid overflow-hidden rounded-[2rem] bg-card ring-1 ring-foreground/8 md:grid-cols-2">
          <Image
            src="/images/glow-skin.jpg"
            alt="Piel luminosa después de la rutina"
            width={800}
            height={900}
            className="h-full min-h-64 w-full object-cover"
          />
          <div className="flex flex-col justify-center gap-5 p-6 sm:p-10">
            <p className="text-xs tracking-[0.22em] text-lavender uppercase">La casa</p>
            <h2 className="font-heading text-3xl sm:text-4xl">Una boutique, no un marketplace.</h2>
            <p className="text-muted-foreground leading-relaxed">
              Armamos el catálogo como se arma un tocador: pocas piezas, bien
              elegidas, con instrucciones claras. Si un tono no existe todavía,
              lo anotamos. Si un sérum se acaba, no lo escondemos.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Los precios están en USD. Pagos por Zelle, pago móvil o
              transferencia, y el envío se acuerda en el chat — igual que en
              Instagram, con la diferencia de que aquí ves stock, fotos y total
              antes de escribir.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-heading text-3xl sm:text-4xl">Favoritos de recompra</h2>
          <Link href="/catalogo" className="text-sm underline-offset-4 hover:underline">
            Catálogo
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-[2rem] bg-secondary/70 px-6 py-12 text-center sm:px-12">
          <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Cómo comprar</p>
          <h2 className="mx-auto mt-3 max-w-xl font-heading text-3xl sm:text-4xl">
            Tres pasos, sin pasarela rara.
          </h2>
          <div className="mx-auto mt-10 grid max-w-4xl gap-8 text-left sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Llena la bolsa",
                text: "Filtra por skincare, rostro, labios u ojos. Elige tono si el producto lo pide.",
              },
              {
                step: "02",
                title: "Revisa el total",
                text: "En el carrito ves cantidades y USD. Agrega tu ciudad y una nota si hace falta.",
              },
              {
                step: "03",
                title: "Escríbenos",
                text: "WhatsApp se abre con el pedido armado. Confirmamos stock, pago y envío.",
              },
            ].map((item) => (
              <div key={item.step}>
                <p className="font-heading text-3xl text-lavender">{item.step}</p>
                <p className="mt-2 font-medium">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
          <Button
            nativeButton={false}
            render={<Link href="/catalogo" />}
            className="mt-10 h-12 rounded-full px-8"
          >
            Empezar a elegir
          </Button>
        </div>
      </section>
    </div>
  )
}
