import { isRouteErrorResponse, useRouteError } from "@remix-run/react"

export function ErrorHandler() {
  const error = useRouteError()

  const errorTitle = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : "Unknown error"
  const errorDescription = isRouteErrorResponse(error) ? error.data : "An unknown error occurred."

  return (
    <div className="mt-20 flex w-full justify-center space-x-3 font-bold text-white">
      <h1>{errorTitle}</h1>
      <span>{errorDescription}</span>
    </div>
  )
}
