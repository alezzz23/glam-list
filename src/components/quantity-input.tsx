"use client"

import { MinusIcon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export function QuantityInput({
  value,
  min = 1,
  max = 99,
  onChange,
  className,
}: {
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center rounded-full border border-border bg-card",
        className
      )}
    >
      <button
        type="button"
        className="grid size-10 place-items-center rounded-full text-foreground hover:bg-muted disabled:opacity-40"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Quitar una unidad"
      >
        <MinusIcon className="size-4" />
      </button>
      <span className="min-w-8 text-center text-sm font-medium tabular-nums">{value}</span>
      <button
        type="button"
        className="grid size-10 place-items-center rounded-full text-foreground hover:bg-muted disabled:opacity-40"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Agregar una unidad"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  )
}
