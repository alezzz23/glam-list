import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

import { seedCategories, seedProducts } from "../src/lib/products"
import { defaultAbout, defaultFaqs, defaultHome, defaultShop } from "../src/lib/site-defaults"

const prisma = new PrismaClient()

async function main() {
  for (const [index, category] of seedCategories.entries()) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {
        name: category.name,
        description: category.description,
        image: category.image,
        sortOrder: index,
      },
      create: {
        id: category.id,
        name: category.name,
        description: category.description,
        image: category.image,
        sortOrder: index,
      },
    })
  }

  for (const product of seedProducts) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        slug: product.slug,
        name: product.name,
        tagline: product.tagline,
        description: product.description,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        categoryId: product.category,
        image: product.image,
        size: product.size,
        stock: product.stock,
        featured: Boolean(product.featured),
        bestseller: Boolean(product.bestseller),
        isNew: Boolean(product.isNew),
        ingredients: product.ingredients,
        howToUse: product.howToUse,
        shades: {
          deleteMany: {},
          create: (product.shades ?? []).map((shade, sortOrder) => ({
            code: shade.id,
            name: shade.name,
            hex: shade.hex,
            sortOrder,
          })),
        },
      },
      create: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        tagline: product.tagline,
        description: product.description,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        categoryId: product.category,
        image: product.image,
        size: product.size,
        stock: product.stock,
        featured: Boolean(product.featured),
        bestseller: Boolean(product.bestseller),
        isNew: Boolean(product.isNew),
        ingredients: product.ingredients,
        howToUse: product.howToUse,
        shades: {
          create: (product.shades ?? []).map((shade, sortOrder) => ({
            code: shade.id,
            name: shade.name,
            hex: shade.hex,
            sortOrder,
          })),
        },
      },
    })
  }

  await prisma.shopSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      name: defaultShop.name,
      suffix: defaultShop.suffix,
      tagline: defaultShop.tagline,
      description: defaultShop.description,
      footerText: defaultShop.footerText,
      whatsapp: defaultShop.whatsapp,
      instagram: defaultShop.instagram,
      email: defaultShop.email,
      location: defaultShop.location,
      hours: defaultShop.hours,
      currencyLabel: defaultShop.currencyLabel,
      logoUrl: defaultShop.logoUrl,
    },
  })

  await prisma.siteContent.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      home: defaultHome,
      about: defaultAbout,
      faqs: defaultFaqs,
    },
  })

  const email = (process.env.ADMIN_EMAIL ?? "admin@bloomshop.ve").trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD ?? "bloom-admin"
  const passwordHash = await hash(password, 12)

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  })

  console.log(`Seed listo. Admin: ${email}`)
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
