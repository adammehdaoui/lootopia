import { Button } from "@/components/ui/button"
import { ActionFunctionArgs, json } from "@remix-run/node"
import { Form, useActionData } from "@remix-run/react"
import { useState } from "react"
import axios from "axios"

type ActionResponse = { message?: string; error?: string }

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")

  const response = await axios.post(
    "http://localhost:8080/auth/register",
    { to: email, rawPassword: password },
    { headers: { "Content-Type": "application/json" } }
  )
  if (response.status.valueOf() === 200) {
    return json<ActionResponse>({ message: "Un email de confirmation vous a été envoyé." })
  }

  return json<ActionResponse>({ error: "Erreur lors de l'inscription." }, { status: 400 })
}

export default function Signup() {
  const actionData = useActionData<typeof action>()
  const [loading, setLoading] = useState(false)

  return (
    <div className="mx-auto my-32 flex max-w-lg flex-col items-center justify-center rounded-3xl border-4 border-white bg-royal p-8 sm:w-full sm:px-4">
      <h1 className="pb-8 text-2xl font-bold text-white">Inscription</h1>
      <Form
        method="post"
        className="flex w-full max-w-xs flex-col justify-center gap-4"
        onSubmit={() => setLoading(true)}
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
      {actionData?.message && <p className="text-green-600">{actionData.message}</p>}
      {actionData?.error && <p className="text-red-600">{actionData.error}</p>}
    </div>
  )
}
