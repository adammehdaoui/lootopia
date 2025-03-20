import { HuntListSkeleton } from "@/components/custom/hunt-list-skeleton"
import React from "react"

export function QueryHandler(props: QueryHandlerProps) {
  const { isPending, error, children } = props

  if (isPending) {
    return <HuntListSkeleton />
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return children
}

type QueryHandlerProps = {
  isPending: boolean
  error: Error | null
  children: React.ReactNode
}
