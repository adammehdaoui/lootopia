import { Spinner } from "@/components/custom/spinner"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { register } from "@/services/auth/auth"
import { ActionFunctionArgs } from "@remix-run/node"
import { Form, useActionData } from "@remix-run/react"
import { useEffect, useState } from "react"

export default function Signup() {
  const actionData = useActionData<typeof action>()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    console.table(actionData)

    if (actionData?.sent) {
      setLoading(false)
      return
    }

    if (actionData?.error) {
      setLoading(false)
      toast({
        title: "Uh oh! Something went wrong.",
        description: actionData.error,
        variant: "destructive"
      })
    }
  }, [actionData, actionData?.error, actionData?.sent, toast])

  const handleSubmit = () => {
    setLoading(true)

    toast({
      title: "An email has been sent",
      description: "Check your inbox to confirm your email address"
    })
  }

  return (
    <div className="mx-auto my-32 flex max-w-lg flex-col items-center justify-center rounded-3xl border-4 border-white bg-royal p-8 sm:w-full sm:px-4">
      <h1 className="pb-8 text-2xl font-bold text-white">Register</h1>
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
        <Button variant="submit">Submit {loading && <Spinner />}</Button>
      </Form>
    </div>
  )
}

export const action = async ({ request }: ActionFunctionArgs): Promise<ActionResponse> => {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Missing email or password", sent: false }
  }

  try {
    await register(email, password)

    return { sent: true }
  } catch (error: unknown) {
    return { error: error as string, sent: false }
  }
}

type ActionResponse = { error?: string; sent: boolean }
