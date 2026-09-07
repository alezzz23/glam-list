import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Bloom Shop.VE: maquillaje y skincare pensados para Venezuela.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Image
        src="/logo.jpg"
        alt="Bloom Shop.VE"
        width={200}
        height={200}
        className="mx-auto rounded-full ring-1 ring-foreground/10"
      />
      <p className="mt-8 text-center text-xs font-medium tracking-[0.22em] text-[#A78BA5] uppercase">
        Nuestra historia
      </p>
      <h1 className="font-heading mt-3 text-center text-4xl sm:text-5xl">
        Un mostrador que cabe en tu teléfono
      </h1>
      <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
        <p>
          Bloom Shop.VE nació para que no tengas que elegir entre un labial que se corre
          con el calor y un serum que nunca llega. Curamos maquillaje y skincare que se
          sienten bien en piel de clima cálido, con fórmulas claras y precios en dólares.
        </p>
        <p>
          No somos un marketplace anónimo: cada pedido se confirma por WhatsApp, te
          decimos si hay stock real y coordinamos el envío a tu ciudad — Caracas, el
          interior o donde estés.
        </p>
        <p>
          La flor del logo es una sakura con una <em>b</em> en el centro: bloom, florecer.
          Queremos que el ritual de maquillarte o hidratarte se sienta como eso, no como
          una carrera contra el brillo a mediodía.
        </p>
      </div>
      <div className="mt-10 rounded-2xl bg-[#F3E6EA] p-6">
        <h2 className="font-heading text-2xl">Cómo pagas y cómo llega</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Pagos en USD, Zelle o Pago Móvil.</li>
          <li>Envíos nacionales por encomienda; retiro coordinado en Caracas.</li>
          <li>Los tonos de base y labial se consultan si no estás segura: escríbenos.</li>
        </ul>
      </div>
      <div className="mt-8 flex justify-center">
        <Button size="lg" className="h-11 px-5" render={<Link href="/catalogo" />}>
          Ir al catálogo
        </Button>
      </div>
    </div>
  );
}
