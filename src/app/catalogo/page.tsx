import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/catalog-browser";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Maquillaje y skincare Bloom Shop.VE. Filtra por labios, ojos, rostro o rutina.",
};

export default function CatalogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-xs font-medium tracking-[0.18em] text-[#A78BA5] uppercase">
        Catálogo
      </p>
      <h1 className="font-heading mt-2 text-4xl">Todo para florecer</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Precios en dólares. El pedido se confirma por WhatsApp con envío a tu ciudad.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-muted-foreground">Cargando catálogo…</p>}>
          <CatalogBrowser />
        </Suspense>
      </div>
    </div>
  );
}
