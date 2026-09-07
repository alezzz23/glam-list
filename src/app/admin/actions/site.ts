"use server"

import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidateStorefront } from "@/lib/revalidate"
import type { AboutContent, FaqItem } from "@/lib/types"

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
    data: { about, faqs },
  })

  revalidateStorefront()
  return { success: "Contenido de la web guardado." }
}
