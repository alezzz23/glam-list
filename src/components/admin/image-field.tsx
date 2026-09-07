"use client"

import { useState } from "react"

import { uploadImageAction } from "@/app/admin/actions/upload"
import { Field } from "@/components/admin/field"
import { Input } from "@/components/ui/input"

export function ImageField({
  name,
  label,
  defaultValue,
  hint,
}: {
  name: string
  label: string
  defaultValue?: string
  hint?: string
}) {
  const [value, setValue] = useState(defaultValue ?? "")
  const [status, setStatus] = useState<string>()

  async function onFile(file: File | undefined) {
    if (!file) return
    setStatus("Subiendo…")
    const data = new FormData()
    data.set("file", file)
    const result = await uploadImageAction(data)
    if (result.error) {
      setStatus(result.error)
      return
    }
    if (result.url) {
      setValue(result.url)
      setStatus("Imagen lista.")
    }
  }

  return (
    <div className="space-y-2">
      <Field label={label} hint={hint}>
        <Input
          name={name}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="h-10 rounded-2xl"
          placeholder="/images/producto.jpg"
        />
      </Field>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        className="block w-full text-xs text-muted-foreground file:mr-3 file:rounded-full file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-sm"
        onChange={(event) => void onFile(event.target.files?.[0])}
      />
      {status ? <p className="text-xs text-muted-foreground">{status}</p> : null}
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-28 w-28 rounded-2xl object-cover ring-1 ring-foreground/10" />
      ) : null}
    </div>
  )
}
