import { Button } from "@/components/ui/button"
import { ErrorHandler } from "@/handlers/error-handler"
import { confirm } from "@/services/auth"
import { LoaderFunctionArgs, data } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const requestUrl = new URL(request.url)
  const activationCode = requestUrl.searchParams.get("code")
  const mail = requestUrl.searchParams.get("mail")

  if (!activationCode || !mail) {
    return data({
      message: `${ReasonPhrases.BAD_REQUEST}: account not activated, activation code or mail may not be valid`,
      status: StatusCodes.BAD_REQUEST
    })
  }

  try {
    await confirm(activationCode, mail)

    return data({
      message: `${ReasonPhrases.ACCEPTED}: account activated`,
      status: StatusCodes.ACCEPTED
    })
  } catch (error) {
    return data({
      message: `${ReasonPhrases.INTERNAL_SERVER_ERROR}: account not activated, please try again later`,
      status: StatusCodes.INTERNAL_SERVER_ERROR
    })
  }
}

export default function Confirm() {
  const loaderData = useLoaderData<typeof loader>()

  return (
    <>
      {loaderData.status === StatusCodes.ACCEPTED ? (
        <>
          <h1 className="mb-4 w-full text-center text-2xl font-bold text-white">
            {loaderData.message}
          </h1>
          <Button variant="submit">
            <Link to="/login">Login</Link>
          </Button>
        </>
      ) : (
        <ErrorHandler error={loaderData.message} />
      )}
    </>
  )
}
