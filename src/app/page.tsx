import Image from "next/image";
import Link from "next/link";
import { SparklesIcon, TruckIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { PetalBurst } from "@/components/flower-mark";
import { featuredProducts } from "@/lib/products";

const categories = [
  {
    href: "/catalogo?departamento=maquillaje&categoria=labios",
    title: "Labios",
    copy: "Mates, gloss y tintas.",
    tone: "#F3D6D8",
  },
  {
    href: "/catalogo?departamento=maquillaje&categoria=ojos",
    title: "Ojos",
    copy: "Paletas, máscara y trazo.",
    tone: "#E8D4E4",
  },
  {
    href: "/catalogo?departamento=maquillaje&categoria=rostro",
    title: "Rostro",
    copy: "Base, rubor e iluminador.",
    tone: "#F0E4D4",
  },
  {
    href: "/catalogo?departamento=skincare",
    title: "Skincare",
    copy: "Limpieza, glow y SPF.",
    tone: "#DCE8DC",
  },
];

const steps = [
  {
    icon: SparklesIcon,
    title: "Elige",
    copy: "Filtra el catálogo por labios, ojos, rostro o rutina de skin.",
  },
  {
    icon: MessageCircleIcon,
    title: "Arma el pedido",
    copy: "Agrega tonos y cantidades. El carrito se guarda en este dispositivo.",
  },
  {
    icon: TruckIcon,
    title: "Confirma por WhatsApp",
    copy: "Te cotizamos envío a tu ciudad y coordinamos Zelle, Pago Móvil o USD.",
  },
];

export default function HomePage() {
  const featured = featuredProducts();

  return (
    <div>
      <section className="relative overflow-hidden">
        <PetalBurst className="pointer-events-none absolute -top-16 -right-10 size-72 opacity-70 sm:size-96" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-medium tracking-[0.22em] text-[#A78BA5] uppercase">
              Maquillaje y skincare · Venezuela
            </p>
            <h1 className="font-heading mt-4 max-w-xl text-4xl leading-[1.15] sm:text-5xl lg:text-6xl">
              Belleza que florece contigo
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Catálogo curado de labiales, ojos, bases y skincare para el clima y el ritmo
              de aquí. Precios en USD, envíos a todo el país.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="h-11 px-5" render={<Link href="/catalogo" />}>
                Ver catálogo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 px-5"
                render={<Link href="/nosotros" />}
              >
                Conoce Bloom
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-6 rounded-full bg-[#E8B8BC]/30 blur-2xl" />
            <Image
              src="/logo.jpg"
              alt="Logo de Bloom Shop.VE, flor de cerezo con una b"
              width={640}
              height={640}
              priority
              className="relative mx-auto rounded-[2rem] shadow-[0_24px_60px_-24px_rgba(44,36,30,0.35)] ring-1 ring-foreground/10"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="rounded-2xl p-5 ring-1 ring-foreground/8 transition-transform hover:-translate-y-0.5"
              style={{ background: category.tone }}
            >
              <h2 className="font-heading text-2xl">{category.title}</h2>
              <p className="mt-1 text-sm text-foreground/70">{category.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-[#A78BA5] uppercase">
              Selección
            </p>
            <h2 className="font-heading mt-2 text-3xl sm:text-4xl">Lo que más piden</h2>
          </div>
          <Link href="/catalogo" className="text-sm text-[#A78BA5] underline-offset-4 hover:underline">
            Ver todo
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-[#F3EBE3]/80">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="flex gap-4">
              <step.icon className="mt-1 size-5 text-[#A78BA5]" />
              <div>
                <h3 className="font-heading text-xl">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
