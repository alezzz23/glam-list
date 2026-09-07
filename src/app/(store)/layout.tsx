import type { ReactNode } from "react"

import { CatalogHydrator } from "@/components/catalog-hydrator"
import { Providers } from "@/components/providers"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { getStorefront } from "@/lib/catalog"

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
