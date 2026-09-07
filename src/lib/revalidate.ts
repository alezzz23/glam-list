import { revalidatePath } from "next/cache"

export function revalidateStorefront(slug?: string) {
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
