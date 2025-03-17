import { Button } from "@/components/ui/button"
import { json } from "@remix-run/node"
import { Form, useActionData } from "@remix-run/react"
import { useState } from "react"

export const action = async ({ request }) => {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")

  const response = await fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to: email, rawPassword: password })
  })

  if (response.ok) {
    return json({ message: "Un email de confirmation vous a été envoyé." })
  }

  return json({ error: "Erreur lors de l'inscription." }, { status: 400 })
}

export default function Signup() {
  const actionData = useActionData()
  const [loading, setLoading] = useState(false)

  return (
    <div className="mx-72 my-16 flex flex-col items-center justify-center rounded-3xl border-4 border-white bg-royal p-8">
      <h1 className="pb-8 text-2xl font-bold text-white">Inscription</h1>
      <Form
        method="post"
        className="flex w-80 flex-col justify-center gap-4"
        onSubmit={() => setLoading(true)}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="-2-white rounded-md border-2 bg-deep p-2 text-white"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          required
          className="rounded-md border-2 border-white bg-deep p-2 text-white"
        />
        <Button variant="submit">{loading ? "Envoi..." : "S'inscrire"}</Button>
      </Form>
      {actionData?.message && <p className="text-green-600">{actionData.message}</p>}
      {actionData?.error && <p className="text-red-600">{actionData.error}</p>}
    </div>
  )
}
