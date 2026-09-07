import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { shop } from "@/lib/shop"
import { whatsappUrl } from "@/lib/whatsapp"

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Bloom Shop.VE es un emprendimiento venezolano de maquillaje y skincare. Pedidos por WhatsApp y envíos nacionales.",
}

const faqs = [
  {
    q: "¿Cómo hago un pedido?",
    a: "Elige productos en el catálogo, agrégalos a la bolsa y pulsa Pedir por WhatsApp. Confirmamos stock, total y datos de pago en el chat.",
  },
  {
    q: "¿En qué moneda están los precios?",
    a: "En dólares (USD). Al confirmar puedes pagar en USD, bolívares a la tasa del día, o USDT, según coordinemos.",
  },
  {
    q: "¿Hacen envíos fuera de Caracas?",
    a: "Sí. Caracas va por motorizado. El interior sale por encomienda; el costo se calcula según destino y peso del pedido.",
  },
  {
    q: "¿Puedo devolver un producto?",
    a: "Por higiene no aceptamos devolución de cosméticos abiertos. Si llegó dañado o equivocado, escríbenos el mismo día con fotos.",
  },
]

export default function NosotrosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Image
        src="/logo.jpg"
        alt={`Logo de ${shop.fullName}`}
        width={160}
        height={160}
        className="mx-auto size-40 rounded-full object-cover object-[center_38%] ring-1 ring-foreground/10"
      />
      <p className="mt-8 text-center text-xs tracking-[0.22em] text-lavender uppercase">
        Nuestra historia
      </p>
      <h1 className="mt-2 text-center font-heading text-4xl sm:text-5xl">
        Un estudio pequeño, <span className="italic">un catálogo cuidado</span>
      </h1>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
        <p>
          {shop.fullName} nació en Caracas para reunir maquillaje y skincare que
          se sientan bien en el clima de aquí: humedad, sol y aire
          acondicionado. No somos una tienda de mil referencias; curamos una
          colección corta para que cada producto tenga un lugar en tu ritual.
        </p>
        <p>
          El nombre y la flor de cerezo del logo hablan de eso: algo que
          florece en su momento, con calma. Pedimos por WhatsApp porque así
          trabajamos la mayoría de los emprendimientos que nos gustan: con
          conversación, no con un checkout frío.
        </p>
        <p>
          Estamos en {shop.location}. Horario: {shop.hours}. Instagram: @
          {shop.instagram}.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button
          nativeButton={false}
          className="h-11 rounded-full px-6"
          render={
            <a
              href={whatsappUrl(`Hola ${shop.fullName}, quiero hacer una consulta sobre productos y envíos.`)}
              target="_blank"
              rel="noreferrer"
            />
          }
        >
          Escribir por WhatsApp
        </Button>
        <Button
          nativeButton={false}
          variant="outline"
          className="h-11 rounded-full px-6"
          render={<Link href="/catalogo" />}
        >
          Ver catálogo
        </Button>
      </div>

      <section className="mt-16">
        <h2 className="font-heading text-3xl">Preguntas frecuentes</h2>
        <div className="mt-6 divide-y divide-border rounded-3xl bg-card ring-1 ring-foreground/8">
          {faqs.map((item) => (
            <details key={item.q} className="group px-5 py-4">
              <summary className="cursor-pointer list-none font-medium marker:content-none">
                {item.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
