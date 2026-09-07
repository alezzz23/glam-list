import type { Metadata } from "next"
import type { ReactNode } from "react"

import { AdminShell } from "@/components/admin/shell"
import { requireAdmin } from "@/lib/auth"

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s · Admin",
  },
}

export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  const session = await requireAdmin()
  return <AdminShell email={session.email}>{children}</AdminShell>
}
