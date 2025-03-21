import type { ErrorResponse } from "@remix-run/react"
import { isRouteErrorResponse } from "@remix-run/react"

export function getErrorTexts(error?: Error, routeError?: ErrorResponse) {
  if (!error && (!routeError || !isRouteErrorResponse(routeError))) {
    return {
      title: "Unknown error",
      description: "An unknown error occurred."
    }
  }

  if (error) {
    return {
      title: error.name,
      description: error.message
    }
  }

  return {
    title: `${routeError!.status} ${routeError!.statusText}`,
    description: routeError!.data
  }
}
