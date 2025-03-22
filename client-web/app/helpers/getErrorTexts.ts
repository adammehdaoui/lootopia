import type { ErrorResponse } from "@remix-run/react"
import { isRouteErrorResponse } from "@remix-run/react"

export function getErrorTexts(error?: Error | string, routeError?: ErrorResponse) {
  if ((!error && (!routeError || !isRouteErrorResponse(routeError))) || typeof error === "string") {
    return {
      title: "Unknown error",
      description: "An unknown error occurred. Please try again later."
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
