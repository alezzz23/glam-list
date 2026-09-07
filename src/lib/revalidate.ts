import { revalidatePath, revalidateTag, updateTag } from "next/cache"

export function revalidateStorefront(slug?: string) {
  updateTag("storefront")
  revalidateTag("storefront", { expire: 0 })
  revalidatePath("/", "layout")
  revalidatePath("/nosotros")
  revalidatePath("/carrito")
  revalidatePath("/admin", "layout")
  revalidatePath("/admin/productos")
  revalidatePath("/admin/categorias")
  revalidatePath("/admin/tienda")
  revalidatePath("/admin/contenido")
  if (slug) revalidatePath(`/producto/${slug}`)
}
