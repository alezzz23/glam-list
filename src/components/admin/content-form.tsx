"use client"

import { useActionState, useState } from "react"

import { updateContentAction, type SiteState } from "@/app/admin/actions/site"
import { Field, FormMessage } from "@/components/admin/field"
import { ImageField } from "@/components/admin/image-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { FaqItem, HomeHighlight, HowStep, SiteContent } from "@/lib/types"

export function ContentForm({ content }: { content: SiteContent }) {
  const [state, formAction, pending] = useActionState<SiteState, FormData>(updateContentAction, {})
  const [highlights, setHighlights] = useState<HomeHighlight[]>(content.home.highlights)
  const [steps, setSteps] = useState<HowStep[]>(content.home.howSteps)
  const [faqs, setFaqs] = useState<FaqItem[]>(content.faqs)
  const { home, about } = content

  return (
    <form action={formAction} className="space-y-10">
      <section className="space-y-4">
        <h2 className="font-heading text-2xl">Inicio · Hero</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Kicker">
            <Input name="heroKicker" defaultValue={home.heroKicker} className="h-10 rounded-2xl" />
          </Field>
          <Field label="Título del recuadro">
            <Input name="heroCaptionTitle" defaultValue={home.heroCaptionTitle} className="h-10 rounded-2xl" />
          </Field>
        </div>
        <Field label="Título">
          <Textarea name="heroTitle" rows={3} defaultValue={home.heroTitle} className="rounded-2xl" />
        </Field>
        <Field label="Subtítulo">
          <Textarea name="heroSubtitle" rows={3} defaultValue={home.heroSubtitle} className="rounded-2xl" />
        </Field>
        <Field label="Texto del recuadro">
          <Input name="heroCaptionText" defaultValue={home.heroCaptionText} className="h-10 rounded-2xl" />
        </Field>
        <ImageField name="heroImage" label="Imagen del hero" defaultValue={home.heroImage} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl">Destacados</h2>
          <button
            type="button"
            className="text-sm underline-offset-4 hover:underline"
            onClick={() => setHighlights((current) => [...current, { title: "", text: "" }])}
          >
            Agregar
          </button>
        </div>
        {highlights.map((item, index) => (
          <div key={index} className="grid gap-2 sm:grid-cols-[1fr_2fr_auto]">
            <Input
              name="highlightTitle"
              value={item.title}
              placeholder="Título"
              className="h-10 rounded-2xl"
              onChange={(event) =>
                setHighlights((current) =>
                  current.map((row, rowIndex) =>
                    rowIndex === index ? { ...row, title: event.target.value } : row
                  )
                )
              }
            />
            <Input
              name="highlightText"
              value={item.text}
              placeholder="Texto"
              className="h-10 rounded-2xl"
              onChange={(event) =>
                setHighlights((current) =>
                  current.map((row, rowIndex) =>
                    rowIndex === index ? { ...row, text: event.target.value } : row
                  )
                )
              }
            />
            <button
              type="button"
              className="text-sm text-destructive"
              onClick={() => setHighlights((current) => current.filter((_, rowIndex) => rowIndex !== index))}
            >
              Quitar
            </button>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl">Secciones</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Colecciones · kicker">
            <Input name="collectionsEyebrow" defaultValue={home.collectionsEyebrow} className="h-10 rounded-2xl" />
          </Field>
          <Field label="Colecciones · título">
            <Input name="collectionsTitle" defaultValue={home.collectionsTitle} className="h-10 rounded-2xl" />
          </Field>
          <Field label="Destacados · kicker">
            <Input name="featuredEyebrow" defaultValue={home.featuredEyebrow} className="h-10 rounded-2xl" />
          </Field>
          <Field label="Destacados · título">
            <Input name="featuredTitle" defaultValue={home.featuredTitle} className="h-10 rounded-2xl" />
          </Field>
          <Field label="Casa · kicker">
            <Input name="houseEyebrow" defaultValue={home.houseEyebrow} className="h-10 rounded-2xl" />
          </Field>
          <Field label="Casa · título">
            <Input name="houseTitle" defaultValue={home.houseTitle} className="h-10 rounded-2xl" />
          </Field>
          <Field label="Favoritos · título" className="sm:col-span-2">
            <Input name="bestsellersTitle" defaultValue={home.bestsellersTitle} className="h-10 rounded-2xl" />
          </Field>
        </div>
        <ImageField name="houseImage" label="Imagen de la casa" defaultValue={home.houseImage} />
        <Field label="Párrafos de la casa" hint="Uno por párrafo">
          <Textarea
            name="houseParagraphs"
            rows={5}
            defaultValue={home.houseParagraphs.join("\n\n")}
            className="rounded-2xl"
          />
        </Field>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl">Cómo comprar</h2>
          <button
            type="button"
            className="text-sm underline-offset-4 hover:underline"
            onClick={() => setSteps((current) => [...current, { title: "", text: "" }])}
          >
            Agregar paso
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Kicker">
            <Input name="howEyebrow" defaultValue={home.howEyebrow} className="h-10 rounded-2xl" />
          </Field>
          <Field label="Botón">
            <Input name="howCta" defaultValue={home.howCta} className="h-10 rounded-2xl" />
          </Field>
        </div>
        <Field label="Título">
          <Input name="howTitle" defaultValue={home.howTitle} className="h-10 rounded-2xl" />
        </Field>
        {steps.map((item, index) => (
          <div key={index} className="grid gap-2 sm:grid-cols-[1fr_2fr_auto]">
            <Input
              name="howTitleItem"
              value={item.title}
              placeholder="Paso"
              className="h-10 rounded-2xl"
              onChange={(event) =>
                setSteps((current) =>
                  current.map((row, rowIndex) =>
                    rowIndex === index ? { ...row, title: event.target.value } : row
                  )
                )
              }
            />
            <Input
              name="howTextItem"
              value={item.text}
              placeholder="Descripción"
              className="h-10 rounded-2xl"
              onChange={(event) =>
                setSteps((current) =>
                  current.map((row, rowIndex) =>
                    rowIndex === index ? { ...row, text: event.target.value } : row
                  )
                )
              }
            />
            <button
              type="button"
              className="text-sm text-destructive"
              onClick={() => setSteps((current) => current.filter((_, rowIndex) => rowIndex !== index))}
            >
              Quitar
            </button>
          </div>
        ))}
      </section>

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
