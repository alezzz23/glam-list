"use client"

import { useActionState, useMemo, useState } from "react"

import {
  createProductAction,
  updateProductAction,
  type CatalogState,
} from "@/app/admin/actions/catalog"
import { CheckboxField, Field, FormMessage } from "@/components/admin/field"
import { ImageField } from "@/components/admin/image-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { slugify } from "@/lib/slug"
import type { Category, Product } from "@/lib/types"

type ShadeDraft = { code: string; name: string; hex: string }

export function ProductForm({
  product,
  categories,
}: {
  product?: Product
  categories: Category[]
}) {
  const action = useMemo(() => {
    if (product) {
      return updateProductAction.bind(null, product.id)
    }
    return createProductAction
  }, [product])
  const [state, formAction, pending] = useActionState<CatalogState, FormData>(action, {})
  const [name, setName] = useState(product?.name ?? "")
  const [slug, setSlug] = useState(product?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(Boolean(product))
  const [shades, setShades] = useState<ShadeDraft[]>(
    product?.shades?.map((shade) => ({ code: shade.id, name: shade.name, hex: shade.hex })) ?? []
  )

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="shades" value={JSON.stringify(shades)} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre">
          <Input
            name="name"
            required
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              if (!slugTouched) setSlug(slugify(event.target.value))
            }}
            className="h-10 rounded-2xl"
          />
        </Field>
        <Field label="Slug" hint="Se usa en /producto/slug">
          <Input
            name="slug"
            required
            value={slug}
            onChange={(event) => {
              setSlugTouched(true)
              setSlug(event.target.value)
            }}
            className="h-10 rounded-2xl"
          />
        </Field>
        <Field label="Frase corta" className="sm:col-span-2">
          <Input name="tagline" defaultValue={product?.tagline} className="h-10 rounded-2xl" />
        </Field>
        <Field label="Categoría">
          <select
            name="categoryId"
            required
            defaultValue={product?.category}
            className="h-10 w-full rounded-2xl border border-input bg-transparent px-2.5 text-sm"
          >
            <option value="">Elegir…</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Presentación">
          <Input name="size" defaultValue={product?.size} placeholder="30 ml" className="h-10 rounded-2xl" />
        </Field>
        <Field label="Precio USD">
          <Input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={product?.price}
            className="h-10 rounded-2xl"
          />
        </Field>
        <Field label="Precio tachado" hint="Opcional">
          <Input
            name="compareAtPrice"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.compareAtPrice}
            className="h-10 rounded-2xl"
          />
        </Field>
        <Field label="Stock">
          <Input
            name="stock"
            type="number"
            min="0"
            defaultValue={product?.stock ?? 0}
            className="h-10 rounded-2xl"
          />
        </Field>
      </div>

      <ImageField name="image" label="Imagen" defaultValue={product?.image} />

      <Field label="Descripción">
        <Textarea name="description" rows={5} defaultValue={product?.description} className="rounded-2xl" />
      </Field>
      <Field label="Cómo se usa">
        <Textarea name="howToUse" rows={3} defaultValue={product?.howToUse} className="rounded-2xl" />
      </Field>
      <Field label="Ingredientes o contenido" hint="Uno por línea">
        <Textarea
          name="ingredients"
          rows={4}
          defaultValue={product?.ingredients.join("\n")}
          className="rounded-2xl"
        />
      </Field>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Tonos</p>
          <button
            type="button"
            className="text-sm underline-offset-4 hover:underline"
            onClick={() => setShades((current) => [...current, { code: "", name: "", hex: "#E8A3B0" }])}
          >
            Agregar tono
          </button>
        </div>
        {shades.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sin tonos. El producto se agrega directo a la bolsa.</p>
        ) : (
          <div className="space-y-2">
            {shades.map((shade, index) => (
              <div key={index} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto_auto]">
                <Input
                  value={shade.name}
                  placeholder="Nombre"
                  className="h-10 rounded-2xl"
                  onChange={(event) =>
                    setShades((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, name: event.target.value } : item
                      )
                    )
                  }
                />
                <Input
                  value={shade.hex}
                  placeholder="#E8A3B0"
                  className="h-10 rounded-2xl"
                  onChange={(event) =>
                    setShades((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, hex: event.target.value } : item
                      )
                    )
                  }
                />
                <input
                  type="color"
                  value={/^#[0-9a-fA-F]{6}$/.test(shade.hex) ? shade.hex : "#E8A3B0"}
                  className="h-10 w-14 cursor-pointer rounded-xl border border-input bg-transparent p-1"
                  onChange={(event) =>
                    setShades((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, hex: event.target.value } : item
                      )
                    )
                  }
                />
                <button
                  type="button"
                  className="text-sm text-destructive"
                  onClick={() => setShades((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <CheckboxField name="featured" label="Destacado en inicio" defaultChecked={product?.featured} />
        <CheckboxField name="bestseller" label="Favorito de recompra" defaultChecked={product?.bestseller} />
        <CheckboxField name="isNew" label="Nuevo" defaultChecked={product?.isNew} />
      </div>

      <FormMessage error={state.error} success={state.success} />
      <Button type="submit" disabled={pending} className="h-11 rounded-full px-6">
        {pending ? "Guardando…" : product ? "Guardar cambios" : "Crear producto"}
      </Button>
    </form>
  )
}
