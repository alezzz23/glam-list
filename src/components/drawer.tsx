"use client"

import { useEffect, type ReactNode } from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

const CART_DOCK_WIDTH = "24rem"

export function Drawer({
  open,
  onOpenChange,
  side = "right",
  mode = "modal",
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  side?: "left" | "right"
  mode?: "modal" | "dock"
  children: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const desktop = window.matchMedia("(min-width: 1024px)")
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false)
    }
    const apply = () => {
      const docked = mode === "dock" && desktop.matches
      document.documentElement.toggleAttribute("data-cart-dock", docked)
      document.documentElement.style.setProperty("--cart-dock", docked ? CART_DOCK_WIDTH : "0px")
      document.body.style.overflow = docked ? "" : "hidden"
      document.body.style.paddingRight = docked ? CART_DOCK_WIDTH : ""
    }
    apply()
    desktop.addEventListener("change", apply)
    window.addEventListener("keydown", onKey)
    return () => {
      desktop.removeEventListener("change", apply)
      window.removeEventListener("keydown", onKey)
      document.documentElement.removeAttribute("data-cart-dock")
      document.documentElement.style.setProperty("--cart-dock", "0px")
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""
    }
  }, [open, onOpenChange, mode])

  if (!open) return null

  const docked = mode === "dock"

  return createPortal(
    <>
      <button
        type="button"
        className={cn("fixed inset-0 z-[80] bg-foreground/25", docked && "lg:hidden")}
        aria-label="Cerrar panel"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal={mode === "modal" ? true : undefined}
        className={cn(
          "fixed inset-y-0 z-[81] flex w-[min(100%,24rem)] flex-col bg-background shadow-2xl",
          side === "left" ? "left-0" : "right-0"
        )}
      >
        {children}
      </div>
    </>,
    document.body
  )
}
