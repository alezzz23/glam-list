import { ContentForm } from "@/components/admin/content-form"
import { getSiteContent } from "@/lib/catalog"

export const metadata = {
  title: "Páginas",
}

export default async function AdminContentPage() {
  const content = await getSiteContent()

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Web</p>
        <h1 className="mt-2 font-heading text-4xl">Nosotros y FAQ</h1>
        <p className="mt-2 text-muted-foreground">
          Copia y preguntas que aparecen en Nosotros.
        </p>
      </div>
      <div className="rounded-3xl bg-card p-5 ring-1 ring-foreground/8 sm:p-6">
        <ContentForm content={content} />
      </div>
    </div>
  )
}
