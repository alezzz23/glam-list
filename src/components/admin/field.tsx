import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string
  hint?: string
  className?: string
  children: ReactNode
}) {
  return (
    <label className={cn("block space-y-1.5 text-sm", className)}>
      <span className="font-medium">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  )
}

export function FormMessage({ error, success }: { error?: string; success?: string }) {
  if (!error && !success) return null
  return (
    <p className={cn("text-sm", error ? "text-destructive" : "text-emerald-700")}>
      {error ?? success}
    </p>
  )
}

export function CheckboxField({
  name,
  label,
  defaultChecked,
}: {
  name: string
  label: string
  defaultChecked?: boolean
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="size-4 rounded border-input accent-primary"
      />
      {label}
    </label>
  )
}
