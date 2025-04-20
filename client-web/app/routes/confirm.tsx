import { Button } from "@/components/ui/button"
import { ErrorHandler } from "@/handlers/error-handler"
import { confirm } from "@/services/auth"
import { LoaderFunctionArgs, data } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import ConfettiExplosion from "react-confetti-explosion"

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
    console.error("Error during account confirmation:", error)
    throw new Response(
      `${ReasonPhrases.INTERNAL_SERVER_ERROR}: account not activated, please try again later`,
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    )
  }
}

export default function Confirm() {
  const loaderData = useLoaderData<typeof loader>()

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-10 pt-20">
      {loaderData.status === StatusCodes.ACCEPTED ? (
        <>
          <ConfettiExplosion className="z-10" force={1} duration={3000} particleCount={500} />
          <h1 className="mb-4 text-2xl font-bold text-white">{loaderData.message}</h1>
          <Button variant="submit">
            <Link to="/login">Login</Link>
          </Button>
        </>
      ) : (
        <ErrorHandler error={loaderData.message} />
      )}
    </div>
  )
}
