"use client"

import { useActionState } from "react"

import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
  type CatalogState,
} from "@/app/admin/actions/catalog"
import { Field, FormMessage } from "@/components/admin/field"
import { ImageField } from "@/components/admin/image-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Category } from "@/lib/types"

export function CategoryCreateForm() {
  const [state, formAction, pending] = useActionState<CatalogState, FormData>(createCategoryAction, {})

  return (
    <form action={formAction} className="space-y-4 rounded-3xl bg-card p-5 ring-1 ring-foreground/8">
      <h2 className="font-heading text-2xl">Nueva categoría</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre">
          <Input name="name" required className="h-10 rounded-2xl" />
        </Field>
        <Field label="Identificador" hint="Opcional. Se usa en /?categoria=">
          <Input name="id" className="h-10 rounded-2xl" placeholder="skincare" />
        </Field>
        <Field label="Orden">
          <Input name="sortOrder" type="number" defaultValue={0} className="h-10 rounded-2xl" />
        </Field>
      </div>
      <Field label="Descripción">
        <Textarea name="description" rows={2} className="rounded-2xl" />
      </Field>
      <ImageField name="image" label="Imagen" />
      <FormMessage error={state.error} success={state.success} />
      <Button type="submit" disabled={pending} className="h-10 rounded-full px-5">
        {pending ? "Creando…" : "Crear categoría"}
      </Button>
    </form>
  )
}

export function CategoryEditForm({ category }: { category: Category }) {
  const [state, formAction, pending] = useActionState<CatalogState, FormData>(updateCategoryAction, {})
  const [deleteState, deleteAction, deleting] = useActionState<CatalogState, FormData>(
    deleteCategoryAction,
    {}
  )

  return (
    <div className="space-y-3 rounded-3xl bg-card p-5 ring-1 ring-foreground/8">
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="id" value={category.id} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nombre">
            <Input name="name" required defaultValue={category.name} className="h-10 rounded-2xl" />
          </Field>
          <Field label="Identificador">
            <Input disabled value={category.id} className="h-10 rounded-2xl" />
          </Field>
          <Field label="Orden">
            <Input
              name="sortOrder"
              type="number"
              defaultValue={category.sortOrder ?? 0}
              className="h-10 rounded-2xl"
            />
          </Field>
        </div>
        <Field label="Descripción">
          <Textarea name="description" rows={2} defaultValue={category.description} className="rounded-2xl" />
        </Field>
        <ImageField name="image" label="Imagen" defaultValue={category.image} />
        <FormMessage error={state.error} success={state.success} />
        <Button type="submit" disabled={pending} className="h-10 rounded-full px-5">
          {pending ? "Guardando…" : "Guardar"}
        </Button>
      </form>
      <form action={deleteAction}>
        <input type="hidden" name="id" value={category.id} />
        <button type="submit" disabled={deleting} className="text-sm text-destructive">
          Eliminar categoría
        </button>
        <FormMessage error={deleteState.error} success={deleteState.success} />
      </form>
    </div>
  )
}
