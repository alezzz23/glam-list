import Image from "next/image"
import { redirect } from "next/navigation"

import { LoginForm } from "@/components/admin/login-form"
import { getSession } from "@/lib/auth"
import { getShop } from "@/lib/catalog"

export const metadata = {
  title: "Entrar",
}

export default async function AdminLoginPage() {
  if (await getSession()) redirect("/admin")
  const shop = await getShop()

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#f7f1ea] px-4">
      <div className="w-full max-w-md space-y-6 rounded-[2rem] bg-card p-8 ring-1 ring-foreground/8">
        <div className="text-center">
          <Image
            src={shop.logoUrl}
            alt=""
            width={72}
            height={72}
            className="mx-auto size-20 rounded-full object-cover ring-1 ring-foreground/10"
          />
          <h1 className="mt-4 font-heading text-3xl">Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gestiona productos y la web de {shop.fullName}.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
