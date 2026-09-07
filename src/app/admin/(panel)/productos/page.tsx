import Image from "next/image"
import Link from "next/link"

import { DeleteProductButton } from "@/components/admin/delete-product-button"
import { getAdminCategories, getAdminProducts } from "@/lib/catalog"
import { formatPrice } from "@/lib/format"

export const metadata = {
  title: "Productos",
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const params = await searchParams
  const q = typeof params.q === "string" ? params.q.trim().toLowerCase() : ""
  const [products, categories] = await Promise.all([getAdminProducts(), getAdminCategories()])
  const names = new Map(categories.map((category) => [category.id, category.name]))
  const filtered = q
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(q) ||
          product.slug.includes(q) ||
          names.get(product.category)?.toLowerCase().includes(q)
      )
    : products

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Catálogo</p>
          <h1 className="mt-2 font-heading text-4xl">Productos</h1>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="inline-flex h-10 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/80"
        >
          Nuevo producto
        </Link>
      </div>

      <form className="max-w-md">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Buscar por nombre, slug o categoría"
          className="h-11 w-full rounded-full border border-input bg-card px-4 text-sm"
        />
      </form>

      <div className="overflow-x-auto rounded-3xl bg-card ring-1 ring-foreground/8">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-border text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Producto</th>
              <th className="px-4 py-3 font-medium">Categoría</th>
              <th className="px-4 py-3 font-medium">Precio</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="border-b border-border/70 last:border-0">
                <td className="px-4 py-3">
                  <Link href={`/admin/productos/${product.id}`} className="flex items-center gap-3">
                    <Image
                      src={product.image}
                      alt=""
                      width={48}
                      height={48}
                      className="size-12 rounded-xl object-cover"
                    />
                    <span>
                      <span className="block font-medium">{product.name}</span>
                      <span className="text-xs text-muted-foreground">{product.slug}</span>
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {names.get(product.category) ?? product.category}
                </td>
                <td className="px-4 py-3">{formatPrice(product.price)}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link href={`/admin/productos/${product.id}`} className="underline-offset-4 hover:underline">
                      Editar
                    </Link>
                    <DeleteProductButton id={product.id} name={product.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-muted-foreground">
            No hay productos con esa búsqueda.
          </p>
        ) : null}
      </div>
    </div>
  )
}
