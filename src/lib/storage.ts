import "server-only"

import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES } from "@/lib/image-limits"

const BUCKET = "catalog"

const MIME_EXTENSION: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
}

function supabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "")
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return { url, key }
}

function extensionFor(file: Blob) {
  const named = "name" in file && typeof file.name === "string" ? file.name : ""
  const fromName = named.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "")
  if (fromName && ["jpg", "jpeg", "png", "webp", "gif", "avif"].includes(fromName)) {
    return fromName === "jpeg" ? "jpg" : fromName
  }
  return MIME_EXTENSION[file.type] ?? "jpg"
}

export async function uploadCatalogImage(file: Blob): Promise<{ url?: string; error?: string }> {
  if (file.size === 0) return { error: "Elige una imagen." }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) return { error: "Usa JPG, PNG, WebP, GIF o AVIF." }
  if (file.size > MAX_IMAGE_BYTES) return { error: "La imagen no puede pesar más de 5 MB." }

  const config = supabaseConfig()
  if (!config) {
    return { error: "Falta la configuración de Storage (NEXT_PUBLIC_SUPABASE_URL)." }
  }

  const path = `products/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${extensionFor(file)}`
  const response = await fetch(`${config.url}/storage/v1/object/${BUCKET}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.key}`,
      apikey: config.key,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "true",
    },
    body: Buffer.from(await file.arrayBuffer()),
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string; error?: string } | null
    console.error("Storage upload failed", response.status, payload)
    return { error: payload?.message || payload?.error || "No se pudo subir la imagen." }
  }

  return { url: `${config.url}/storage/v1/object/public/${BUCKET}/${path}` }
}
