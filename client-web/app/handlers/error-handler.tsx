import { getErrorTexts } from "@/helpers/getErrorTexts"
import { ErrorResponse, useRouteError } from "@remix-run/react"

export function ErrorHandler(props: ErrorHandlerProps) {
  const { error } = props
  const routeError = useRouteError() as ErrorResponse | undefined

  const { title, description } = getErrorTexts(error, routeError)

  return (
    <div className="mt-20 flex w-full justify-center font-bold text-white">
      <h1>{title}</h1>
      <span>{description}</span>
    </div>
  )
}

type ErrorHandlerProps = {
  error?: Error
}
