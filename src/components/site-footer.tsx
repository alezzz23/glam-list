import { AtSign, Clock, Mail, MapPin, MessageCircle, Music2, Sparkles } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/data/products";

const socials = [
  {
    icon: AtSign,
    label: "@aura.beauty en Instagram",
    href: "https://instagram.com",
  },
  {
    icon: Music2,
    label: "@aura.beauty",
    href: "https://tiktok.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    icon: Mail,
    label: "hola@aurabeauty.com",
    href: "mailto:hola@aurabeauty.com",
  },
];

export function SiteFooter() {
  return (
    <footer id="contacto" className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="size-4.5" />
            </span>
            <span className="font-display text-xl font-semibold">
              Aura<span className="text-primary"> Beauty</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Emprendimiento de maquillaje y skincare. Cada producto se prueba y
            se elige a mano antes de llegar al catálogo.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase">
            Contacto y redes
          </h3>
          <ul className="mt-4 space-y-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <li key={label + href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon className="size-4 text-primary" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase">
            Pedidos y entregas
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
              Respondemos WhatsApp de lunes a sábado, 9:00 a 19:00.
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              Envíos a todo el país. Entregas el mismo día en la zona centro.
            </li>
            <li className="flex items-start gap-2.5">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              Paga por transferencia o contra entrega.
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Aura Beauty · Hecho con cariño.
        </p>
      </div>
    </footer>
  );
}
