import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Tu pedido",
  description: "Revisa tu pedido Bloom Shop.VE y confírmalo por WhatsApp.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-xs font-medium tracking-[0.18em] text-[#A78BA5] uppercase">
        Pedido
      </p>
      <h1 className="font-heading mt-2 text-4xl">Confirmar por WhatsApp</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Te respondemos con disponibilidad, costo de envío y datos para Zelle, Pago Móvil o
        efectivo en USD.
      </p>
      <div className="mt-8">
        <CheckoutForm />
      </div>
    </div>
  );
}
