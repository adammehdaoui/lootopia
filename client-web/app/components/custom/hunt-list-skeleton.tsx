import { Skeleton } from "@/components/ui/skeleton"

export function HuntListSkeleton() {
  return (
    <div className="mt-16 flex flex-wrap justify-center gap-5 pb-20">
      {[...Array(10)].map((_, i) => (
        <Skeleton
          key={i}
          className="h-card w-card animate-pulse rounded-full bg-slate-600 opacity-80 duration-700"
        />
      ))}
    </div>
  )
}
