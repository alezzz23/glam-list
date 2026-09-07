export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="h-10 w-48 animate-pulse rounded-full bg-secondary" />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-96 animate-pulse rounded-3xl bg-secondary" />
        ))}
      </div>
    </div>
  )
}
