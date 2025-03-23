import { Button } from "@/components/ui/button"
import { requireAuth } from "@/services/auth.server"
import { data, redirect, type LoaderFunction } from "@remix-run/node"
import { Form } from "@remix-run/react"

export const loader: LoaderFunction = async (args) => {
  try {
    await requireAuth(args)
    return data({})
  } catch {
    return redirect("/login")
  }
}

export default function AdminPage() {
  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <p>Bienvenue dans admin 🚀</p>

      <Form method="post" action="/logout">
        <Button variant="destructive" className="mt-4">
          Se déconnecter
        </Button>
      </Form>
    </div>
  )
}
