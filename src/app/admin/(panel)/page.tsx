import Link from "next/link"
import { AlertTriangleIcon, PackageIcon, SparklesIcon, StoreIcon } from "lucide-react"

import { getAdminCategories, getAdminProducts, getAdminShop } from "@/lib/catalog"
import { formatPrice } from "@/lib/format"

export const metadata = {
  title: "Resumen",
}

export default async function AdminHomePage() {
  const [products, categories, shop] = await Promise.all([
    getAdminProducts(),
    getAdminCategories(),
    getAdminShop(),
  ])
  const soldOut = products.filter((product) => product.stock <= 0)
  const low = products.filter((product) => product.stock > 0 && product.stock <= 4)
  const featured = products.filter((product) => product.featured)

  const cards = [
    { label: "Productos", value: products.length, icon: PackageIcon },
    { label: "Categorías", value: categories.length, icon: StoreIcon },
    { label: "Destacados", value: featured.length, icon: SparklesIcon },
    { label: "Stock bajo / agotados", value: low.length + soldOut.length, icon: AlertTriangleIcon },
  ]

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Resumen</p>
        <h1 className="mt-2 font-heading text-4xl">{shop.fullName}</h1>
        <p className="mt-2 text-muted-foreground">
          WhatsApp {shop.whatsapp} · {shop.location} · {shop.hours}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-3xl bg-card p-5 ring-1 ring-foreground/8">
            <card.icon className="size-5 text-lavender" />
            <p className="mt-4 font-heading text-3xl">{card.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{card.label}</p>
          </div>
        ))}
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl">Atención de stock</h2>
          <Link href="/admin/productos" className="text-sm underline-offset-4 hover:underline">
            Ver todos
          </Link>
        </div>
        {soldOut.length === 0 && low.length === 0 ? (
          <p className="rounded-3xl bg-card p-5 text-sm text-muted-foreground ring-1 ring-foreground/8">
            Todo el catálogo tiene stock cómodo.
          </p>
        ) : (
          <ul className="divide-y divide-border rounded-3xl bg-card ring-1 ring-foreground/8">
            {[...soldOut, ...low].map((product) => (
              <li key={product.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <div>
                  <Link href={`/admin/productos/${product.id}`} className="font-medium hover:underline">
                    {product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stock <= 0 ? "Agotado" : `Quedan ${product.stock}`}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
