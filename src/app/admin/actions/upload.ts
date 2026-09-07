"use server"

import { requireAdmin } from "@/lib/auth"
import { uploadCatalogImage } from "@/lib/storage"

export async function uploadImageAction(formData: FormData): Promise<{ url?: string; error?: string }> {
  await requireAdmin()

  const file = formData.get("file")
  if (!(file instanceof Blob) || file.size === 0) {
    return { error: "Elige una imagen." }
  }

  return uploadCatalogImage(file)
}
