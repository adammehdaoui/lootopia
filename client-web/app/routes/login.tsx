import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { login } from "@/services/auth/auth"
import { authCookie } from "@/services/auth/cookies"
import { ActionFunction, ActionFunctionArgs, data, redirect } from "@remix-run/node"
import { Form, Link, useActionData } from "@remix-run/react"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import { useEffect } from "react"

type ActionResponse = {
  message: string
  status: StatusCodes
}

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return data<ActionResponse>({
      message: `${ReasonPhrases.BAD_REQUEST}: Email and password are required`,
      status: StatusCodes.BAD_REQUEST
    })
  }

  try {
    const { token } = await login(email, password)

    return redirect("/", {
      headers: {
        "Set-Cookie": await authCookie.serialize(token)
      }
    })
  } catch (error) {
    return data<ActionResponse>({
      message: `${ReasonPhrases.UNAUTHORIZED}: Incorrect email or password`,
      status: StatusCodes.UNAUTHORIZED
    })
  }
}

export default function Login() {
  const actionData = useActionData<typeof action>()
  const { toast } = useToast()

  useEffect(() => {
    if (!actionData) return

    if (actionData.status !== StatusCodes.OK) {
      toast({
        title: "Error",
        description: actionData.message,
        variant: "destructive"
      })
    }
  }, [actionData, toast])

  return (
    <div className="mx-auto my-32 flex max-w-lg flex-col items-center justify-center rounded-3xl border-4 border-white bg-royal p-8 sm:w-full sm:px-4">
      <h1 className="pb-8 text-2xl font-bold text-white">Connexion</h1>
      <Form method="post" className="flex w-full max-w-xs flex-col justify-center gap-4">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full rounded-md border-2 border-white bg-deep p-2 text-white"
        />
        <Input
          type="password"
          name="password"
          placeholder="Mot de passe"
          required
          className="w-full rounded-md border-2 border-white bg-deep p-2 text-white"
        />
        <Button variant="submit">Se connecter</Button>
      </Form>
      <Link to="/register" className="mt-4 text-white underline">
        <p>Vous n&apos;avez pas de compte ? Inscrivez-vous</p>
      </Link>
    </div>
  )
}
