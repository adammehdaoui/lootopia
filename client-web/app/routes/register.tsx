import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { register } from "@/services/auth/auth"
import { ActionFunction, ActionFunctionArgs, data } from "@remix-run/node"
import { Form, useActionData } from "@remix-run/react"
import { useEffect, useState } from "react"

type ActionResponse = { message?: string; error?: string }

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return
  }

  const response = await register(email, password)

  if (response.status.valueOf() === 200) {
    return data<ActionResponse>({ message: "Un email de confirmation vous a été envoyé." })
  }

  return data<ActionResponse>({ error: "Erreur lors de l'inscription." }, { status: 400 })
}

export default function Signup() {
  const actionData = useActionData<typeof action>()
  const [loading, setLoading] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    actionData?.error &&
      toast({
        title: "Erreur",
        description: actionData?.error
      })
  }, [actionData?.error, toast])

  const handleSubmit = () => {
    setLoading(true)

    toast({
      title: "Succès",
      description: "Votre email à ete envoyé"
    })
  }

  return (
    <div className="mx-auto my-32 flex max-w-lg flex-col items-center justify-center rounded-3xl border-4 border-white bg-royal p-8 sm:w-full sm:px-4">
      <h1 className="pb-8 text-2xl font-bold text-white">Inscription</h1>
      <Form
        method="post"
        className="flex w-full max-w-xs flex-col justify-center gap-4"
        onSubmit={handleSubmit}
      >
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
        <Button variant="submit">{loading ? "Envoi..." : "S'inscrire"}</Button>
      </Form>
    </div>
  )
}
