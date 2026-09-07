import type { Metadata } from "next"
import type { ReactNode } from "react"

import { CatalogHydrator } from "@/components/catalog-hydrator"
import { Providers } from "@/components/providers"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { getShop, getStorefront } from "@/lib/catalog"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  const shop = await getShop()
  const defaultTitle = `${shop.fullName} · Maquillaje y skincare`
  return {
    title: {
      default: defaultTitle,
      absolute: defaultTitle,
      template: `%s · ${shop.fullName}`,
    },
    description: shop.description,
    icons: {
      icon: shop.logoUrl,
      apple: shop.logoUrl,
    },
  }
}

export default async function StoreLayout({ children }: { children: ReactNode }) {
  const { shop, products, categories } = await getStorefront()

  return (
    <CatalogHydrator shop={shop} products={products} categories={categories}>
      <Providers>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
      </Providers>
    </CatalogHydrator>
  )
}
