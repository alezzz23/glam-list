"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductVisual } from "@/components/product-visual";
import { shadeForLine, useCart } from "@/lib/cart-context";
import { formatUsd } from "@/lib/format";
import { getProductById } from "@/lib/products";
import { whatsappUrl } from "@/lib/whatsapp";

export function CheckoutForm() {
  const { lines, subtotal, clear } = useCart();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");

  const message = useMemo(() => {
    const items = lines
      .map((line) => {
        const product = getProductById(line.productId);
        if (!product) return null;
        const shade = shadeForLine(line.productId, line.shadeId);
        const shadeBit = shade ? ` — ${shade.name}` : "";
        return `• ${product.name}${shadeBit} x${line.quantity} — ${formatUsd(product.price * line.quantity)}`;
      })
      .filter(Boolean)
      .join("\n");

    return [
      "Hola Bloom Shop.VE 🌸",
      "Quiero hacer este pedido:",
      "",
      items,
      "",
      `Total: ${formatUsd(subtotal)}`,
      "",
      `Nombre: ${name || "—"}`,
      `Ciudad / zona: ${city || "—"}`,
      notes ? `Notas: ${notes}` : null,
    ]
      .filter((line) => line !== null)
      .join("\n");
  }, [lines, subtotal, name, city, notes]);

  if (lines.length === 0) {
    return (
      <div className="rounded-2xl bg-card px-6 py-16 text-center ring-1 ring-foreground/8">
        <p className="font-heading text-2xl">Tu pedido está vacío</p>
        <p className="mt-2 text-muted-foreground">
          Agrega labiales, serums o lo que quieras florecer hoy.
        </p>
        <Button className="mt-6" render={<Link href="/catalogo" />}>
          Ir al catálogo
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-2xl bg-card p-5 ring-1 ring-foreground/8 sm:p-6">
        <h2 className="font-heading text-2xl">Resumen</h2>
        <ul className="mt-5 divide-y divide-foreground/8">
          {lines.map((line) => {
            const product = getProductById(line.productId);
            if (!product) return null;
            const shade = shadeForLine(line.productId, line.shadeId);
            return (
              <li key={`${line.productId}-${line.shadeId}`} className="flex gap-3 py-4">
                <ProductVisual
                  vessel={product.vessel}
                  colors={product.colors}
                  className="size-16 overflow-hidden rounded-xl"
                />
                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  {shade && <p className="text-xs text-muted-foreground">{shade.name}</p>}
                  <p className="text-sm text-muted-foreground">x{line.quantity}</p>
                </div>
                <p className="font-heading">{formatUsd(product.price * line.quantity)}</p>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-foreground/8 pt-4">
          <span>Total</span>
          <span className="font-heading text-2xl">{formatUsd(subtotal)}</span>
        </div>
      </section>

      <section className="rounded-2xl bg-card p-5 ring-1 ring-foreground/8 sm:p-6">
        <h2 className="font-heading text-2xl">Datos de entrega</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Confirmamos disponibilidad, envío y método de pago por WhatsApp.
        </p>
        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
          }}
        >
          <div className="grid gap-1.5">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              className="h-10 bg-background"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              placeholder="Cómo te llamas"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="city">Ciudad o zona</Label>
            <Input
              id="city"
              className="h-10 bg-background"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              required
              placeholder="Caracas, Maracaibo, Valencia…"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="notes">Notas (opcional)</Label>
            <Input
              id="notes"
              className="h-10 bg-background"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Horario, combinaciones, tono de piel…"
            />
          </div>
          <Button type="submit" size="lg" className="h-11 w-full">
            Enviar pedido por WhatsApp
          </Button>
          <button
            type="button"
            className="text-sm text-muted-foreground hover:text-foreground"
            onClick={() => clear()}
          >
            Vaciar pedido
          </button>
        </form>
      </section>
    </div>
  );
}
