import { Button } from "@/components/ui/button"
import { login } from "@/services/auth"
import { authCookie } from "@/services/cookies.server"
import { data, redirect } from "@remix-run/node"
import { Form, Link, useActionData } from "@remix-run/react"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"

type ActionResponse = { message?: string; error?: string }

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return data<ActionResponse>({ error: "Email et mot de passe requis" }, { status: 400 })
  }

  try {
    const { token } = await login(email, password)

    return redirect("/", {
      headers: {
        "Set-Cookie": await authCookie.serialize(token)
      }
    })
  } catch (error) {
    return data<ActionResponse>({ error: "Identifiants incorrects" }, { status: 401 })
  }
}

export default function Login() {
  const actionData = useActionData<typeof action>()
  const { toast } = useToast()

  useEffect(() => {
    if (actionData?.error) {
      toast({
        title: "Échec",
        description: actionData.error,
        variant: "destructive"
      })
    }
  }, [actionData, toast])

  return (
    <div className="mx-auto my-32 flex max-w-lg flex-col items-center justify-center rounded-3xl border-4 border-white bg-royal p-8 sm:w-full sm:px-4">
      <h1 className="pb-8 text-2xl font-bold text-white">Connexion</h1>
      <Form method="post" className="flex w-full max-w-xs flex-col justify-center gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full rounded-md border-2 border-white bg-deep p-2 text-white"
        />
        <input
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
