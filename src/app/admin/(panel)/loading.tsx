export default function AdminLoading() {
  return (
    <div className="space-y-6">
      <div className="h-4 w-24 animate-pulse rounded-full bg-foreground/10" />
      <div className="h-10 w-56 animate-pulse rounded-full bg-foreground/10" />
      <div className="h-72 animate-pulse rounded-3xl bg-card ring-1 ring-foreground/8" />
    </div>
  )
}
