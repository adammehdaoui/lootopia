import { Button } from "@/components/ui/button"
import { Form } from "@remix-run/react"

export default function AdminPage() {
  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <p>Welcome to admin 🚀</p>

      <Form method="post" action="/logout">
        <Button variant="destructive" className="mt-4">
          Logout
        </Button>
      </Form>
    </div>
  )
}
