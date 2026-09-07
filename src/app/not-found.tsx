import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-xs tracking-[0.22em] text-lavender uppercase">404</p>
      <h1 className="mt-3 font-heading text-4xl">Esta página no floreció</h1>
      <p className="mt-3 text-muted-foreground">
        El enlace no existe o el producto salió del catálogo. Vuelve al inicio o
        recorre la colección.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button className="h-11 rounded-full px-6" render={<Link href="/" />}>
          Inicio
        </Button>
        <Button
          variant="outline"
          className="h-11 rounded-full px-6"
          render={<Link href="/catalogo" />}
        >
          Catálogo
        </Button>
      </div>
    </div>
  )
}
