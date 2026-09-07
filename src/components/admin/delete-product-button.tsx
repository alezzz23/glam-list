"use client"

import { useActionState } from "react"

import { deleteProductAction, type CatalogState } from "@/app/admin/actions/catalog"

export function DeleteProductButton({
  id,
  name,
  label = "Borrar",
}: {
  id: string
  name?: string
  label?: string
}) {
  const [state, action, pending] = useActionState<CatalogState, FormData>(deleteProductAction, {})

  return (
    <form
      action={action}
      onSubmit={(event) => {
        const prompt = name
          ? `¿Borrar “${name}”? Esta acción no se puede deshacer.`
          : "¿Borrar este producto? Esta acción no se puede deshacer."
        if (!window.confirm(prompt)) event.preventDefault()
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={pending}
        className="text-sm text-destructive disabled:opacity-50"
      >
        {pending ? "Borrando…" : label}
      </button>
      {state.error ? <p className="mt-1 text-xs text-destructive">{state.error}</p> : null}
    </form>
  )
}
