import { ProductForm } from "@/components/admin/product-form"
import { getAdminCategories } from "@/lib/catalog"

export const metadata = {
  title: "Nuevo producto",
}

export default async function NewProductPage() {
  const categories = await getAdminCategories()

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Catálogo</p>
        <h1 className="mt-2 font-heading text-4xl">Nuevo producto</h1>
      </div>
      <div className="rounded-3xl bg-card p-5 ring-1 ring-foreground/8 sm:p-6">
        <ProductForm categories={categories} />
      </div>
    </div>
  )
}
