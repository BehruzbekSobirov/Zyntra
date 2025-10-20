"use client"

export function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-20 bg-muted rounded-lg"></div>
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="p-6 bg-card border border-border rounded-lg animate-pulse">
      <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-muted rounded w-1/2"></div>
    </div>
  )
}
