"use client"

import { useEffect, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export function Drawer({
  open,
  onOpenChange,
  side = "right",
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  side?: "left" | "right"
  children: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        className="absolute inset-0 bg-foreground/25"
        aria-label="Cerrar panel"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "absolute inset-y-0 flex w-[min(100%,24rem)] flex-col bg-background shadow-2xl",
          side === "left" ? "left-0" : "right-0"
        )}
      >
        {children}
      </div>
    </div>
  )
}
