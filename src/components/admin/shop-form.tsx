"use client"

import { useActionState } from "react"

import { updateShopAction, type SiteState } from "@/app/admin/actions/site"
import { Field, FormMessage } from "@/components/admin/field"
import { ImageField } from "@/components/admin/image-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Shop } from "@/lib/types"

export function ShopForm({ shop }: { shop: Shop }) {
  const [state, formAction, pending] = useActionState<SiteState, FormData>(updateShopAction, {})

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre">
          <Input name="name" required defaultValue={shop.name} className="h-10 rounded-2xl" />
        </Field>
        <Field label="Sufijo" hint="Ejemplo: .VE">
          <Input name="suffix" defaultValue={shop.suffix} className="h-10 rounded-2xl" />
        </Field>
        <Field label="Lema" className="sm:col-span-2">
          <Input name="tagline" defaultValue={shop.tagline} className="h-10 rounded-2xl" />
        </Field>
        <Field label="WhatsApp" hint="Venezuela: 58 + número sin el 0. Ejemplo: 584124900939">
          <Input
            name="whatsapp"
            required
            defaultValue={shop.whatsapp}
            inputMode="numeric"
            className="h-10 rounded-2xl"
          />
        </Field>
        <Field label="Instagram">
          <Input name="instagram" defaultValue={shop.instagram} className="h-10 rounded-2xl" />
        </Field>
        <Field label="Correo">
          <Input name="email" type="email" defaultValue={shop.email} className="h-10 rounded-2xl" />
        </Field>
        <Field label="Ubicación">
          <Input name="location" defaultValue={shop.location} className="h-10 rounded-2xl" />
        </Field>
        <Field label="Horario">
          <Input name="hours" defaultValue={shop.hours} className="h-10 rounded-2xl" />
        </Field>
        <Field label="Moneda">
          <Input name="currencyLabel" defaultValue={shop.currencyLabel} className="h-10 rounded-2xl" />
        </Field>
      </div>
      <Field label="Descripción (SEO)">
        <Textarea name="description" rows={3} defaultValue={shop.description} className="rounded-2xl" />
      </Field>
      <Field label="Texto del pie">
        <Textarea name="footerText" rows={3} defaultValue={shop.footerText} className="rounded-2xl" />
      </Field>
      <ImageField name="logoUrl" label="Logo" defaultValue={shop.logoUrl} />
      <FormMessage error={state.error} success={state.success} />
      <Button type="submit" disabled={pending} className="h-11 rounded-full px-6">
        {pending ? "Guardando…" : "Guardar tienda"}
      </Button>
    </form>
  )
}
