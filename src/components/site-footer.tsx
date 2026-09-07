import Link from "next/link";
import { FlowerMark } from "@/components/flower-mark";
import { WHATSAPP_NUMBER, whatsappUrl } from "@/lib/whatsapp";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-foreground/8 bg-[#F3EBE3]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <FlowerMark className="size-9" />
            <p className="font-heading text-xl">
              Bloom Shop<span className="text-[#A78BA5]">.VE</span>
            </p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Catálogo de maquillaje y skincare con envíos a todo Venezuela. Pedidos por
            WhatsApp, pagos en USD, Zelle o Pago Móvil.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-[#A78BA5] uppercase">
            Tienda
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/catalogo" className="hover:text-[#A78BA5]">
                Catálogo
              </Link>
            </li>
            <li>
              <Link href="/catalogo?departamento=maquillaje" className="hover:text-[#A78BA5]">
                Maquillaje
              </Link>
            </li>
            <li>
              <Link href="/catalogo?departamento=skincare" className="hover:text-[#A78BA5]">
                Skincare
              </Link>
            </li>
            <li>
              <Link href="/nosotros" className="hover:text-[#A78BA5]">
                Nosotros
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-[#A78BA5] uppercase">
            Pedidos
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={whatsappUrl("Hola Bloom Shop.VE 🌸 Quiero hacer un pedido.")}
                className="hover:text-[#A78BA5]"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp {WHATSAPP_NUMBER.replace(/^58/, "+58 ")}
              </a>
            </li>
            <li>Envíos a todo el país</li>
            <li>Retiro coordinado en Caracas</li>
          </ul>
        </div>
      </div>
      <p className="border-t border-foreground/8 px-4 py-4 text-center text-xs text-muted-foreground">
        Bloom Shop.VE — belleza que florece contigo.
      </p>
    </footer>
  );
}
