import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-xs font-medium tracking-[0.2em] text-[#A78BA5] uppercase">404</p>
      <h1 className="font-heading mt-3 text-4xl">Esta página se marchitó</h1>
      <p className="mt-3 text-muted-foreground">
        El enlace no existe o el producto ya no está en el catálogo.
      </p>
      <Button className="mt-8" render={<Link href="/catalogo" />}>
        Volver al catálogo
      </Button>
    </div>
  );
}
