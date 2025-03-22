import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { getCookie } from "./cookies.server"

export async function requireAuth({ request }: LoaderFunctionArgs) {
  const token = await getCookie(request, "token")

  if (!token) {
    throw json({ error: "Unauthorized" }, { status: 401 })
  }

  return token
}
