import { CheckoutForm } from "@/components/checkout-form"

export const metadata = {
  title: "Tu bolsa",
  description: "Revisa tu pedido de Bloom Shop.VE y envíalo por WhatsApp.",
}

export default function CarritoPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Pedido</p>
      <h1 className="mt-2 font-heading text-4xl sm:text-5xl">Tu bolsa</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Cuando el resumen esté listo, WhatsApp se abre con el pedido escrito.
        Ahí confirmamos pago (Zelle, pago móvil o transferencia) y el envío.
      </p>
      <div className="mt-10">
        <CheckoutForm />
      </div>
    </div>
  )
}
