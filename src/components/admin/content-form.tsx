"use client"

import { useActionState, useState } from "react"

import { updateContentAction, type SiteState } from "@/app/admin/actions/site"
import { Field, FormMessage } from "@/components/admin/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { FaqItem, SiteContent } from "@/lib/types"

export function ContentForm({ content }: { content: SiteContent }) {
  const [state, formAction, pending] = useActionState<SiteState, FormData>(updateContentAction, {})
  const [faqs, setFaqs] = useState<FaqItem[]>(content.faqs)
  const { about } = content

  return (
    <form action={formAction} className="space-y-10">
      <section className="space-y-4">
        <h2 className="font-heading text-2xl">Nosotros</h2>
        <Field label="Kicker">
          <Input name="aboutEyebrow" defaultValue={about.eyebrow} className="h-10 rounded-2xl" />
        </Field>
        <Field label="Título">
          <Input name="aboutTitle" defaultValue={about.title} className="h-10 rounded-2xl" />
        </Field>
        <Field label="Párrafos" hint="Uno por párrafo">
          <Textarea name="aboutParagraphs" rows={6} defaultValue={about.paragraphs.join("\n\n")} className="rounded-2xl" />
        </Field>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl">Preguntas frecuentes</h2>
          <button
            type="button"
            className="text-sm underline-offset-4 hover:underline"
            onClick={() => setFaqs((current) => [...current, { q: "", a: "" }])}
          >
            Agregar pregunta
          </button>
        </div>
        {faqs.map((item, index) => (
          <div key={index} className="space-y-2 rounded-2xl bg-card p-3 ring-1 ring-foreground/8">
            <Input
              name="faqQ"
              value={item.q}
              placeholder="Pregunta"
              className="h-10 rounded-2xl"
              onChange={(event) =>
                setFaqs((current) =>
                  current.map((row, rowIndex) =>
                    rowIndex === index ? { ...row, q: event.target.value } : row
                  )
                )
              }
            />
            <Textarea
              name="faqA"
              value={item.a}
              placeholder="Respuesta"
              rows={2}
              className="rounded-2xl"
              onChange={(event) =>
                setFaqs((current) =>
                  current.map((row, rowIndex) =>
                    rowIndex === index ? { ...row, a: event.target.value } : row
                  )
                )
              }
            />
            <button
              type="button"
              className="text-sm text-destructive"
              onClick={() => setFaqs((current) => current.filter((_, rowIndex) => rowIndex !== index))}
            >
              Quitar
            </button>
          </div>
        ))}
      </section>

      <FormMessage error={state.error} success={state.success} />
      <Button type="submit" disabled={pending} className="h-11 rounded-full px-6">
        {pending ? "Guardando…" : "Guardar páginas"}
      </Button>
    </form>
  )
}
