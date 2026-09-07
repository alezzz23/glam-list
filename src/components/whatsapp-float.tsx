"use client"

import { MessageCircleIcon } from "lucide-react"

import { shop } from "@/lib/shop"
import { whatsappUrl } from "@/lib/whatsapp"

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl(`Hola, quiero información de ${shop.fullName}`)}
      target="_blank"
      rel="noreferrer"
      className="fixed right-4 bottom-4 z-50 inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-medium text-white shadow-lg shadow-emerald-900/20 transition-[right,background-color] hover:bg-[#1ebe5d] sm:right-6 sm:bottom-6 lg:right-[calc(1.5rem+var(--cart-dock,0px))]"
      aria-label="Escribir por WhatsApp"
    >
      <MessageCircleIcon className="size-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  )
}
