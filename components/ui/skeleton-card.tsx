import { cn } from "@/lib/utils"

interface SkeletonCardProps {
  className?: string
  variant?: "default" | "horizontal"
}

export function SkeletonCard({ className, variant = "default" }: SkeletonCardProps) {
  if (variant === "horizontal") {
    return (
      <div className={cn("flex gap-4 p-4 rounded-2xl bg-card border border-border", className)}>
        <div className="w-24 h-24 rounded-xl bg-muted animate-pulse" />
        <div className="flex-1 space-y-3">
          <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("rounded-2xl bg-card border border-border overflow-hidden", className)}>
      <div className="aspect-video bg-muted animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-3 w-full bg-muted rounded animate-pulse" />
          <div className="h-3 w-5/6 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}
