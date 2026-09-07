"use client"

import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
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
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="size-10 rounded-full"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Quitar una unidad"
      >
        <MinusIcon />
      </Button>
      <span className="min-w-8 text-center text-sm font-medium tabular-nums">{value}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="size-10 rounded-full"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Agregar una unidad"
      >
        <PlusIcon />
      </Button>
    </div>
  )
}
