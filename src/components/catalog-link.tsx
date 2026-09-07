"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps, MouseEvent } from "react"

export const CATALOG_URL_EVENT = "bloom:catalog-url"

export function replaceCatalogUrl(href: string) {
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`
  if (href === current) return
  // Keep Next's history state (`__NA`) so this does not trigger an RSC refetch.
  window.history.replaceState(window.history.state, "", href)
  window.dispatchEvent(new Event(CATALOG_URL_EVENT))
}

function isModifiedClick(event: MouseEvent) {
  return event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey
}

function pathOf(href: ComponentProps<typeof Link>["href"]) {
  if (typeof href !== "string") return null
  return new URL(href, "http://n.local").pathname
}

export function CatalogLink({
  href,
  onClick,
  prefetch,
  scroll,
  ...props
}: ComponentProps<typeof Link>) {
  const pathname = usePathname()
  const samePath = pathOf(href) === pathname

  return (
    <Link
      href={href}
      scroll={scroll ?? false}
      prefetch={prefetch ?? (samePath ? false : undefined)}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented || isModifiedClick(event) || typeof href !== "string") return
        const next = new URL(href, window.location.href)
        if (next.origin !== window.location.origin || next.pathname !== window.location.pathname) {
          return
        }
        event.preventDefault()
        replaceCatalogUrl(`${next.pathname}${next.search}${next.hash}`)
      }}
      {...props}
    />
  )
}
