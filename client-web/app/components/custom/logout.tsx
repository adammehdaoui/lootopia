import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Form } from "@remix-run/react"

export default function Logout(props: LogoutProps) {
  return (
    <Form method="post" action="/logout" className={cn(props?.className, "mb-4 w-full")}>
      <Button variant="destructive" className="mt-4" type="submit">
        Logout
      </Button>
    </Form>
  )
}

type LogoutProps = {
  className?: string
}
