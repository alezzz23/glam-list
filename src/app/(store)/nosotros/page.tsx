import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getShop, getSiteContent } from "@/lib/catalog"
import { whatsappUrl } from "@/lib/whatsapp"

export async function generateMetadata(): Promise<Metadata> {
  const shop = await getShop()
  return {
    title: "Nosotros",
    description: `${shop.fullName} es un emprendimiento venezolano de maquillaje y skincare. Pedidos por WhatsApp y envíos nacionales.`,
  }
}

export default async function NosotrosPage() {
  const [shop, content] = await Promise.all([getShop(), getSiteContent()])
  const { about, faqs } = content

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Image
        src={shop.logoUrl}
        alt={`Logo de ${shop.fullName}`}
        width={160}
        height={160}
        className="mx-auto size-40 rounded-full object-cover object-[center_38%] ring-1 ring-foreground/10"
      />
      <p className="mt-8 text-center text-xs tracking-[0.22em] text-lavender uppercase">
        {about.eyebrow}
      </p>
      <h1 className="mt-2 text-center font-heading text-4xl sm:text-5xl">
        {about.title}
      </h1>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
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
