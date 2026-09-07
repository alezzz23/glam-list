import { notFound } from "next/navigation"

import { DeleteProductButton } from "@/components/admin/delete-product-button"
import { ProductForm } from "@/components/admin/product-form"
import { getAdminCategories, getAdminProduct } from "@/lib/catalog"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getAdminProduct(id)
  return { title: product?.name ?? "Producto" }
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [product, categories] = await Promise.all([getAdminProduct(id), getAdminCategories()])
  if (!product) notFound()

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Catálogo</p>
          <h1 className="mt-2 font-heading text-4xl">{product.name}</h1>
        </div>
        <DeleteProductButton id={product.id} name={product.name} label="Eliminar" />
      </div>
      <div className="rounded-3xl bg-card p-5 ring-1 ring-foreground/8 sm:p-6">
        <ProductForm product={product} categories={categories} />
      </div>
    </div>
  )
}
