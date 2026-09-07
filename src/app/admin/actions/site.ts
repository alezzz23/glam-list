"use server"

import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidateStorefront } from "@/lib/revalidate"
import type { AboutContent, FaqItem, HomeContent } from "@/lib/types"

export type SiteState = { error?: string; success?: string }

function readString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim()
}

function lines(formData: FormData, key: string) {
  return readString(formData, key)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
}

function readPairs(formData: FormData, titleKey: string, textKey: string) {
  const titles = formData.getAll(titleKey).map((item) => String(item).trim())
  const texts = formData.getAll(textKey).map((item) => String(item).trim())
  return titles
    .map((title, index) => ({ title, text: texts[index] ?? "" }))
    .filter((item) => item.title || item.text)
}

export async function updateShopAction(_prev: SiteState, formData: FormData): Promise<SiteState> {
  await requireAdmin()

  const name = readString(formData, "name")
  const suffix = readString(formData, "suffix")
  const whatsapp = readString(formData, "whatsapp").replace(/\D/g, "")

  if (!name || !whatsapp) {
    return { error: "Nombre y WhatsApp son obligatorios." }
  }

  await prisma.shopSettings.update({
    where: { id: "default" },
    data: {
      name,
      suffix,
      tagline: readString(formData, "tagline"),
      description: readString(formData, "description"),
      footerText: readString(formData, "footerText"),
      whatsapp,
      instagram: readString(formData, "instagram").replace(/^@/, ""),
      email: readString(formData, "email"),
      location: readString(formData, "location"),
      hours: readString(formData, "hours"),
      currencyLabel: readString(formData, "currencyLabel") || "USD",
      logoUrl: readString(formData, "logoUrl") || "/logo.jpg",
    },
  })

  revalidateStorefront()
  return { success: "Datos de la tienda guardados." }
}

export async function updateContentAction(_prev: SiteState, formData: FormData): Promise<SiteState> {
  await requireAdmin()

  const home: HomeContent = {
    heroKicker: readString(formData, "heroKicker"),
    heroTitle: readString(formData, "heroTitle"),
    heroSubtitle: readString(formData, "heroSubtitle"),
    heroImage: readString(formData, "heroImage"),
    heroCaptionTitle: readString(formData, "heroCaptionTitle"),
    heroCaptionText: readString(formData, "heroCaptionText"),
    highlights: readPairs(formData, "highlightTitle", "highlightText"),
    collectionsEyebrow: readString(formData, "collectionsEyebrow"),
    collectionsTitle: readString(formData, "collectionsTitle"),
    featuredEyebrow: readString(formData, "featuredEyebrow"),
    featuredTitle: readString(formData, "featuredTitle"),
    houseEyebrow: readString(formData, "houseEyebrow"),
    houseTitle: readString(formData, "houseTitle"),
    houseImage: readString(formData, "houseImage"),
    houseParagraphs: lines(formData, "houseParagraphs"),
    bestsellersTitle: readString(formData, "bestsellersTitle"),
    howEyebrow: readString(formData, "howEyebrow"),
    howTitle: readString(formData, "howTitle"),
    howSteps: readPairs(formData, "howTitleItem", "howTextItem"),
    howCta: readString(formData, "howCta"),
  }

  const about: AboutContent = {
    eyebrow: readString(formData, "aboutEyebrow"),
    title: readString(formData, "aboutTitle"),
    paragraphs: lines(formData, "aboutParagraphs"),
  }

  const questions = formData.getAll("faqQ").map((item) => String(item).trim())
  const answers = formData.getAll("faqA").map((item) => String(item).trim())
  const faqs: FaqItem[] = questions
    .map((q, index) => ({ q, a: answers[index] ?? "" }))
    .filter((item) => item.q || item.a)

  await prisma.siteContent.update({
    where: { id: "default" },
    data: { home, about, faqs },
  })

  revalidateStorefront()
  return { success: "Contenido de la web guardado." }
}
