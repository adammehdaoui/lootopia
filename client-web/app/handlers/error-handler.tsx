import { isRouteErrorResponse, useRouteError } from "@remix-run/react"

export function ErrorHandler(props: ErrorHandlerProps) {
  const routeError = useRouteError()
  const { error } = props

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const errorTitle = isRouteErrorResponse(routeError)
    ? `${routeError.status} ${routeError.statusText}`
    : "Unknown error"
  const errorDescription = isRouteErrorResponse(routeError)
    ? routeError.data
    : "An unknown error occurred."

  return (
    <div className="mt-20 flex w-full justify-center space-x-3 font-bold text-white">
      <h1>{errorTitle}</h1>
      <span>{errorDescription}</span>
    </div>
  )
}

type ErrorHandlerProps = {
  error?: Error
}
