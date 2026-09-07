"use client"

import { useState } from "react"

import { updateProductImageAction } from "@/app/admin/actions/catalog"
import { uploadImageAction } from "@/app/admin/actions/upload"
import { Field } from "@/components/admin/field"
import { Input } from "@/components/ui/input"
import { MAX_IMAGE_BYTES } from "@/lib/image-limits"

export function ImageField({
  name,
  label,
  defaultValue,
  hint,
  productId,
}: {
  name: string
  label: string
  defaultValue?: string
  hint?: string
  productId?: string
}) {
  const [value, setValue] = useState(defaultValue ?? "")
  const [status, setStatus] = useState<string>()
  const [failed, setFailed] = useState(false)

  async function onFile(file: File | undefined) {
    if (!file) return
    if (file.size > MAX_IMAGE_BYTES) {
      setFailed(true)
      setStatus("La imagen no puede pesar más de 5 MB.")
      return
    }

    setFailed(false)
    setStatus("Subiendo…")
    const data = new FormData()
    data.set("file", file)
    const result = await uploadImageAction(data)
    if (result.error || !result.url) {
      setFailed(true)
      setStatus(result.error ?? "No se pudo subir la imagen.")
      return
    }

    setValue(result.url)

    if (productId) {
      const saved = await updateProductImageAction(productId, result.url)
      if (saved.error) {
        setFailed(true)
        setStatus(`${saved.error} Pulsa Guardar cambios.`)
        return
      }
      setStatus("Foto guardada.")
      return
    }

    setStatus("Imagen lista. Pulsa Guardar cambios para aplicarla.")
  }

  return (
    <div className="space-y-2">
      <Field
        label={label}
        hint={hint ?? "JPG, PNG, WebP, GIF o AVIF. Máximo 5 MB."}
      >
        <Input
          name={name}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="h-10 rounded-2xl"
          placeholder="https://…"
        />
      </Field>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        className="block w-full text-xs text-muted-foreground file:mr-3 file:rounded-full file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-sm"
        onChange={(event) => {
          const input = event.currentTarget
          void onFile(input.files?.[0]).finally(() => {
            input.value = ""
          })
        }}
      />
      {status ? (
        <p className={`text-xs ${failed ? "text-destructive" : "text-muted-foreground"}`}>{status}</p>
      ) : null}
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-28 w-28 rounded-2xl object-cover ring-1 ring-foreground/10" />
      ) : null}
    </div>
  )
}
