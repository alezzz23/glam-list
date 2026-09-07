export type Category = {
  id: string
  name: string
  description: string
  image: string
  sortOrder?: number
}

export type CategoryId = string

export type ProductShade = {
  id: string
  name: string
  hex: string
}

export type Product = {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  price: number
  compareAtPrice?: number
  category: CategoryId
  image: string
  size: string
  stock: number
  featured?: boolean
  bestseller?: boolean
  isNew?: boolean
  shades?: ProductShade[]
  ingredients: string[]
  howToUse: string
}

export type Shop = {
  name: string
  suffix: string
  fullName: string
  tagline: string
  description: string
  footerText: string
  whatsapp: string
  instagram: string
  email: string
  location: string
  hours: string
  currencyLabel: string
  logoUrl: string
}

export type HomeHighlight = {
  title: string
  text: string
}

export type HowStep = {
  title: string
  text: string
}

export type HomeContent = {
  heroKicker: string
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  heroCaptionTitle: string
  heroCaptionText: string
  highlights: HomeHighlight[]
  collectionsEyebrow: string
  collectionsTitle: string
  featuredEyebrow: string
  featuredTitle: string
  houseEyebrow: string
  houseTitle: string
  houseImage: string
  houseParagraphs: string[]
  bestsellersTitle: string
  howEyebrow: string
  howTitle: string
  howSteps: HowStep[]
  howCta: string
}

export type AboutContent = {
  eyebrow: string
  title: string
  paragraphs: string[]
}

export type FaqItem = {
  q: string
  a: string
}

export type SiteContent = {
  home: HomeContent
  about: AboutContent
  faqs: FaqItem[]
}

export type AdminSession = {
  id: string
  email: string
}
