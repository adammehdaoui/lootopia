import React from "react"

export function QueryHandler(props: QueryHandlerProps) {
  const { isPending, error, children } = props

  if (isPending) {
    return <div>is pending</div>
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
