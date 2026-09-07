import { CategoryCreateForm, CategoryEditForm } from "@/components/admin/category-manager"
import { getAdminCategories } from "@/lib/catalog"

export const metadata = {
  title: "Categorías",
}

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Catálogo</p>
        <h1 className="mt-2 font-heading text-4xl">Categorías</h1>
      </div>
      <CategoryCreateForm />
      <div className="grid gap-4 lg:grid-cols-2">
        {categories.map((category) => (
          <CategoryEditForm key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}
