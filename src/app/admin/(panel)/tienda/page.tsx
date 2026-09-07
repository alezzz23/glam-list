import { ShopForm } from "@/components/admin/shop-form"
import { getAdminShop } from "@/lib/catalog"

export const metadata = {
  title: "Tienda",
}

export default async function AdminShopPage() {
  const shop = await getAdminShop()

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Web</p>
        <h1 className="mt-2 font-heading text-4xl">Datos de la tienda</h1>
        <p className="mt-2 text-muted-foreground">
          Nombre, contacto, logo y textos que se ven en el encabezado y el pie.
        </p>
      </div>
      <div className="rounded-3xl bg-card p-5 ring-1 ring-foreground/8 sm:p-6">
        <ShopForm shop={shop} />
      </div>
    </div>
  )
}
