import { revalidatePath, revalidateTag } from "next/cache"

export function revalidateStorefront(slug?: string) {
  revalidateTag("storefront", { expire: 0 })
  revalidatePath("/", "layout")
  revalidatePath("/nosotros")
  revalidatePath("/carrito")
  revalidatePath("/admin")
  revalidatePath("/admin/productos")
  revalidatePath("/admin/categorias")
  revalidatePath("/admin/tienda")
  revalidatePath("/admin/contenido")
  if (slug) revalidatePath(`/producto/${slug}`)
}
