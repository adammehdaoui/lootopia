import { HuntListSkeleton } from "@/components/custom/hunt-list-skeleton"
import { ErrorHandler } from "@/handlers/error-handler"
import React from "react"

export function QueryHandler(props: QueryHandlerProps) {
  const { isPending, error, children } = props

  if (isPending) {
    return <HuntListSkeleton />
  }

  if (error) {
    return <ErrorHandler error={error} />
  }

  return children
}

type QueryHandlerProps = {
  readonly isPending: boolean
  readonly error: Error | null
  readonly children: React.ReactNode
}
