"use client"

import { useActionState } from "react"

import { loginAction, type AuthState } from "@/app/admin/actions/auth"
import { Field, FormMessage } from "@/components/admin/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function LoginForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(loginAction, {})

  return (
    <form action={formAction} className="space-y-4">
      <Field label="Correo">
        <Input
          name="email"
          type="email"
          required
          autoComplete="username"
          className="h-11 rounded-2xl"
          defaultValue="admin@bloomshop.ve"
        />
      </Field>
      <Field label="Contraseña">
        <Input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="h-11 rounded-2xl"
        />
      </Field>
      <FormMessage error={state.error} />
      <Button type="submit" disabled={pending} className="h-11 w-full rounded-full">
        {pending ? "Entrando…" : "Entrar"}
      </Button>
    </form>
  )
}
