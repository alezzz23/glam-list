"use server"

import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

import { requireAdmin } from "@/lib/auth"

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"])
const MAX_BYTES = 5 * 1024 * 1024

export async function uploadImageAction(formData: FormData): Promise<{ url?: string; error?: string }> {
  await requireAdmin()

  const file = formData.get("file")
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Elige una imagen." }
  }
  if (!ALLOWED.has(file.type)) {
    return { error: "Usa JPG, PNG, WebP, GIF o AVIF." }
  }
  if (file.size > MAX_BYTES) {
    return { error: "La imagen no puede pesar más de 5 MB." }
  }

  const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg"
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`
  const dir = path.join(process.cwd(), "public", "uploads")
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, safeName), Buffer.from(await file.arrayBuffer()))
  return { url: `/uploads/${safeName}` }
}
