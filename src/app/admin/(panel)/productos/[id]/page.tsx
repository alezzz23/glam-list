import { notFound } from "next/navigation"

import { deleteProductAction } from "@/app/admin/actions/catalog"
import { ProductForm } from "@/components/admin/product-form"
import { getCategories, getProductRecord } from "@/lib/catalog"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProductRecord(id)
  return { title: product?.name ?? "Producto" }
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [product, categories] = await Promise.all([getProductRecord(id), getCategories()])
  if (!product) notFound()

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Catálogo</p>
          <h1 className="mt-2 font-heading text-4xl">{product.name}</h1>
        </div>
        <form action={deleteProductAction}>
          <input type="hidden" name="id" value={product.id} />
          <button type="submit" className="text-sm text-destructive">
            Eliminar
          </button>
        </form>
      </div>
      <div className="rounded-3xl bg-card p-5 ring-1 ring-foreground/8 sm:p-6">
        <ProductForm product={product} categories={categories} />
      </div>
    </div>
  )
}
