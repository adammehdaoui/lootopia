import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { register } from "@/services/auth/auth"
import { ActionFunctionArgs } from "@remix-run/node"
import { Form, useActionData, useNavigation } from "@remix-run/react"
import { useEffect } from "react"

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
    console.error(error)

    return { error: error as string, sent: false }
  }
}

export default function Signup() {
  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()
  const { toast } = useToast()

  useEffect(() => {
    if (!actionData) return

    if (actionData.error) {
      toast({
        title: "Uh oh, something went wrong",
        description: `${actionData.error}`,
        variant: "destructive"
      })
    }
  }, [navigation.state, actionData, toast])

  const onSubmit = (): void => {
    toast({
      title: "Success",
      description: "An email has been sent, check your inbox to confirm your email address"
    })
  }

  return (
    <div className="mx-auto my-32 flex max-w-lg flex-col items-center justify-center rounded-3xl border-4 border-white bg-royal p-8 sm:w-full sm:px-4">
      <h1 className="pb-8 text-2xl font-bold text-white">Register</h1>
      <Form method="post" className="flex w-full max-w-xs flex-col justify-center gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full cursor-text rounded-md border-2 border-white bg-deep p-2 text-white"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full cursor-text rounded-md border-2 border-white bg-deep p-2 text-white"
        />
        <Button onClick={onSubmit} variant="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

type ActionResponse = { error?: string; sent: boolean }
