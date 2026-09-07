import "server-only"

import type { Prisma } from "@prisma/client"
import { unstable_cache } from "next/cache"
import { connection } from "next/server"
import { cache } from "react"

import { prisma } from "@/lib/db"
import { defaultAbout, defaultFaqs, defaultHome, defaultShop } from "@/lib/site-defaults"
import type { AboutContent, Category, FaqItem, HomeContent, Product, Shop, SiteContent } from "@/lib/types"

async function queryCatalog<T>(fallback: T, query: () => Promise<T>): Promise<T> {
  // Postpone until a real request so `next build` does not hit Postgres.
  // Vercel prerenders /_not-found and other static routes without DATABASE_URL.
  await connection()
  if (!process.env.DATABASE_URL) return fallback
  try {
    return await query()
  } catch (error) {
    console.error("Catalog query failed", error)
    return fallback
  }
}

type ProductRecord = Prisma.ProductGetPayload<{ include: { shades: true } }>

function toNumber(value: Prisma.Decimal | number | null | undefined) {
  if (value == null) return undefined
  return Number(value)
}

export function mapProduct(row: ProductRecord): Product {
  const shades = [...row.shades]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((shade) => ({
      id: shade.code,
      name: shade.name,
      hex: shade.hex,
    }))

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    price: Number(row.price),
    compareAtPrice: toNumber(row.compareAtPrice),
    category: row.categoryId,
    image: row.image,
    size: row.size,
    stock: row.stock,
    featured: row.featured,
    bestseller: row.bestseller,
    isNew: row.isNew,
    shades: shades.length ? shades : undefined,
    ingredients: row.ingredients,
    howToUse: row.howToUse,
  }
}

function mapCategory(row: { id: string; name: string; description: string; image: string; sortOrder: number }): Category {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    image: row.image,
    sortOrder: row.sortOrder,
  }
}

function mapShop(row: {
  name: string
  suffix: string
  tagline: string
  description: string
  footerText: string
  whatsapp: string
  instagram: string
  email: string
  location: string
  hours: string
  currencyLabel: string
  logoUrl: string
}): Shop {
  return {
    name: row.name,
    suffix: row.suffix,
    fullName: `${row.name}${row.suffix}`,
    tagline: row.tagline,
    description: row.description,
    footerText: row.footerText,
    whatsapp: row.whatsapp,
    instagram: row.instagram,
    email: row.email,
    location: row.location,
    hours: row.hours,
    currencyLabel: row.currencyLabel,
    logoUrl: row.logoUrl,
  }
}

export const getShop = cache(async (): Promise<Shop> => {
  return (await loadStorefront()).shop
})

export const getCategories = cache(async (): Promise<Category[]> => {
  return (await loadStorefront()).categories
})

export const getProducts = cache(async (): Promise<Product[]> => {
  return (await loadStorefront()).products
})

export const getProductBySlug = cache(async (slug: string) => {
  const products = await getProducts()
  return products.find((product) => product.slug === slug)
})

export const getProductRecord = cache(async (id: string) => {
  const products = await getProducts()
  return products.find((product) => product.id === id)
})

export async function getFeaturedProducts(limit = 4) {
  const products = await getProducts()
  return products.filter((product) => product.featured).slice(0, limit)
}

export async function getBestsellers(limit = 3) {
  const products = await getProducts()
  return products.filter((product) => product.bestseller).slice(0, limit)
}

export async function getRelatedProducts(product: Product, limit = 4) {
  const products = await getProducts()
  return products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, limit)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function asString(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback
}

function asStringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return fallback
  const items = value.filter((item): item is string => typeof item === "string")
  return items.length ? items : fallback
}

function parseHome(value: unknown): HomeContent {
  if (!isRecord(value)) return defaultHome
  return {
    heroKicker: asString(value.heroKicker, defaultHome.heroKicker),
    heroTitle: asString(value.heroTitle, defaultHome.heroTitle),
    heroSubtitle: asString(value.heroSubtitle, defaultHome.heroSubtitle),
    heroImage: asString(value.heroImage, defaultHome.heroImage),
    heroCaptionTitle: asString(value.heroCaptionTitle, defaultHome.heroCaptionTitle),
    heroCaptionText: asString(value.heroCaptionText, defaultHome.heroCaptionText),
    highlights: Array.isArray(value.highlights)
      ? value.highlights
          .filter(isRecord)
          .map((item, index) => ({
            title: asString(item.title, defaultHome.highlights[index]?.title ?? "Destacado"),
            text: asString(item.text, defaultHome.highlights[index]?.text ?? ""),
          }))
      : defaultHome.highlights,
    collectionsEyebrow: asString(value.collectionsEyebrow, defaultHome.collectionsEyebrow),
    collectionsTitle: asString(value.collectionsTitle, defaultHome.collectionsTitle),
    featuredEyebrow: asString(value.featuredEyebrow, defaultHome.featuredEyebrow),
    featuredTitle: asString(value.featuredTitle, defaultHome.featuredTitle),
    houseEyebrow: asString(value.houseEyebrow, defaultHome.houseEyebrow),
    houseTitle: asString(value.houseTitle, defaultHome.houseTitle),
    houseImage: asString(value.houseImage, defaultHome.houseImage),
    houseParagraphs: asStringArray(value.houseParagraphs, defaultHome.houseParagraphs),
    bestsellersTitle: asString(value.bestsellersTitle, defaultHome.bestsellersTitle),
    howEyebrow: asString(value.howEyebrow, defaultHome.howEyebrow),
    howTitle: asString(value.howTitle, defaultHome.howTitle),
    howSteps: Array.isArray(value.howSteps)
      ? value.howSteps
          .filter(isRecord)
          .map((item, index) => ({
            title: asString(item.title, defaultHome.howSteps[index]?.title ?? "Paso"),
            text: asString(item.text, defaultHome.howSteps[index]?.text ?? ""),
          }))
      : defaultHome.howSteps,
    howCta: asString(value.howCta, defaultHome.howCta),
  }
}

function parseAbout(value: unknown): AboutContent {
  if (!isRecord(value)) return defaultAbout
  return {
    eyebrow: asString(value.eyebrow, defaultAbout.eyebrow),
    title: asString(value.title, defaultAbout.title),
    paragraphs: asStringArray(value.paragraphs, defaultAbout.paragraphs),
  }
}

function parseFaqs(value: unknown): FaqItem[] {
  if (!Array.isArray(value)) return defaultFaqs
  const items = value.filter(isRecord).map((item) => ({
    q: asString(item.q, ""),
    a: asString(item.a, ""),
  }))
  return items.length ? items : defaultFaqs
}

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  return (await loadStorefront()).content
})

export const getStorefront = cache(async () => loadStorefront())

const emptyStorefront = {
  shop: defaultShop,
  categories: [] as Category[],
  products: [] as Product[],
  content: {
    home: defaultHome,
    about: defaultAbout,
    faqs: defaultFaqs,
  },
}

const getCachedStorefront = unstable_cache(
  async () => {
    const [shopRow, categoryRows, productRows, contentRow] = await Promise.all([
      prisma.shopSettings.findUnique({ where: { id: "default" } }),
      prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.product.findMany({
        include: { shades: true },
        orderBy: [{ featured: "desc" }, { name: "asc" }],
      }),
      prisma.siteContent.findUnique({ where: { id: "default" } }),
    ])

    return {
      shop: shopRow ? mapShop(shopRow) : defaultShop,
      categories: categoryRows.map(mapCategory),
      products: productRows.map(mapProduct),
      content: {
        home: parseHome(contentRow?.home),
        about: parseAbout(contentRow?.about),
        faqs: parseFaqs(contentRow?.faqs),
      },
    }
  },
  ["storefront"],
  { tags: ["storefront"], revalidate: 60 }
)

async function loadStorefront() {
  return queryCatalog(emptyStorefront, getCachedStorefront)
}
