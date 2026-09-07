import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-xs tracking-[0.22em] text-lavender uppercase">404</p>
      <h1 className="mt-3 font-heading text-4xl">Esta página no floreció</h1>
      <p className="mt-3 text-muted-foreground">
        El enlace no existe o el producto salió del catálogo. Recorre lo que sí
        está en stock.
      </p>
      <div className="mt-8">
        <Button nativeButton={false} render={<Link href="/" />} className="rounded-full">
          Ver catálogo
        </Button>
      </div>
    </div>
  )
}
