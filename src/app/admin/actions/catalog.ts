"use server"

import { Prisma } from "@prisma/client"
import { redirect } from "next/navigation"

import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidateStorefront } from "@/lib/revalidate"
import { categoryIdFromName, slugify } from "@/lib/slug"

export type CatalogState = { error?: string; success?: string }

function readString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim()
}

function readNumber(formData: FormData, key: string) {
  const raw = readString(formData, key)
  if (!raw) return undefined
  const value = Number(raw)
  return Number.isFinite(value) ? value : undefined
}

function readBool(formData: FormData, key: string) {
  const value = formData.get(key)
  return value === "on" || value === "true" || value === "1"
}

function parseShades(raw: string) {
  if (!raw.trim()) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((item): item is { code?: string; name: string; hex: string } => {
        return (
          typeof item === "object" &&
          item !== null &&
          typeof (item as { name?: unknown }).name === "string" &&
          typeof (item as { hex?: unknown }).hex === "string"
        )
      })
      .map((item, index) => ({
        code: slugify(item.code || item.name) || `tono-${index + 1}`,
        name: item.name.trim(),
        hex: item.hex.trim() || "#E8A3B0",
        sortOrder: index,
      }))
      .filter((item) => item.name)
  } catch {
    return []
  }
}

async function saveProduct(formData: FormData, id?: string) {
  await requireAdmin()

  const name = readString(formData, "name")
  const slug = slugify(readString(formData, "slug") || name)
  const tagline = readString(formData, "tagline")
  const description = readString(formData, "description")
  const howToUse = readString(formData, "howToUse")
  const categoryId = readString(formData, "categoryId")
  const image = readString(formData, "image")
  const size = readString(formData, "size")
  const price = readNumber(formData, "price")
  const compareAtPrice = readNumber(formData, "compareAtPrice")
  const stock = readNumber(formData, "stock")
  const ingredients = readString(formData, "ingredients")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
  const shades = parseShades(readString(formData, "shades"))

  if (!name || !slug || !categoryId || price == null || price < 0) {
    return { error: "Nombre, slug, categoría y precio son obligatorios." }
  }

  const category = await prisma.category.findUnique({ where: { id: categoryId } })
  if (!category) return { error: "La categoría no existe." }

  const duplicate = await prisma.product.findFirst({
    where: { slug, NOT: id ? { id } : undefined },
    select: { id: true },
  })
  if (duplicate) return { error: "Ese slug ya está en uso." }

  const data = {
    name,
    slug,
    tagline,
    description,
    howToUse,
    categoryId,
    image: image || "/images/bottles.jpg",
    size,
    price,
    compareAtPrice: compareAtPrice && compareAtPrice > 0 ? compareAtPrice : null,
    stock: Math.max(0, Math.round(stock ?? 0)),
    featured: readBool(formData, "featured"),
    bestseller: readBool(formData, "bestseller"),
    isNew: readBool(formData, "isNew"),
    ingredients,
  }

  try {
    const product = id
      ? await prisma.product.update({
          where: { id },
          data: {
            ...data,
            shades: { deleteMany: {}, create: shades },
          },
        })
      : await prisma.product.create({
          data: {
            ...data,
            shades: { create: shades },
          },
        })
    revalidateStorefront(product.slug)
    return { product }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: "Ese slug ya está en uso." }
    }
    return { error: "No se pudo guardar el producto." }
  }
}

export async function createProductAction(
  _prev: CatalogState,
  formData: FormData
): Promise<CatalogState> {
  const result = await saveProduct(formData)
  if ("error" in result && result.error) return { error: result.error }
  if ("product" in result && result.product) redirect(`/admin/productos/${result.product.id}`)
  return { error: "No se pudo crear el producto." }
}

export async function updateProductAction(
  id: string,
  _prev: CatalogState,
  formData: FormData
): Promise<CatalogState> {
  const result = await saveProduct(formData, id)
  if ("error" in result && result.error) return { error: result.error }
  return { success: "Producto actualizado." }
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin()
  const id = readString(formData, "id")
  const product = await prisma.product.findUnique({ where: { id }, select: { slug: true } })
  if (!product) return
  await prisma.product.delete({ where: { id } })
  revalidateStorefront(product.slug)
  redirect("/admin/productos")
}

export async function createCategoryAction(
  _prev: CatalogState,
  formData: FormData
): Promise<CatalogState> {
  await requireAdmin()
  const name = readString(formData, "name")
  const description = readString(formData, "description")
  const image = readString(formData, "image")
  const id = categoryIdFromName(readString(formData, "id") || name)
  const sortOrder = Math.round(readNumber(formData, "sortOrder") ?? 0)

  if (!name) return { error: "El nombre es obligatorio." }

  const exists = await prisma.category.findUnique({ where: { id } })
  if (exists) return { error: "Ya existe una categoría con ese identificador." }

  await prisma.category.create({
    data: {
      id,
      name,
      description,
      image: image || "/images/bottles.jpg",
      sortOrder,
    },
  })
  revalidateStorefront()
  return { success: "Categoría creada." }
}

export async function updateCategoryAction(
  _prev: CatalogState,
  formData: FormData
): Promise<CatalogState> {
  await requireAdmin()
  const id = readString(formData, "id")
  const name = readString(formData, "name")
  const description = readString(formData, "description")
  const image = readString(formData, "image")
  const sortOrder = Math.round(readNumber(formData, "sortOrder") ?? 0)

  if (!id || !name) return { error: "Nombre e identificador son obligatorios." }

  await prisma.category.update({
    where: { id },
    data: { name, description, image, sortOrder },
  })
  revalidateStorefront()
  return { success: "Categoría actualizada." }
}

export async function deleteCategoryAction(
  _prev: CatalogState,
  formData: FormData
): Promise<CatalogState> {
  await requireAdmin()
  const id = readString(formData, "id")
  const count = await prisma.product.count({ where: { categoryId: id } })
  if (count > 0) {
    return { error: "Mueve o elimina los productos de esta categoría antes de borrarla." }
  }
  await prisma.category.delete({ where: { id } })
  revalidateStorefront()
  return { success: "Categoría eliminada." }
}
