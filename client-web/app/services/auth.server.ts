import { json, type LoaderFunctionArgs } from "@remix-run/node"

import { authCookie } from "./cookies.server"

export async function requireAuth({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie")

  const token = await authCookie.parse(cookieHeader)

  if (!token) {
    throw json({ error: "Unauthorized" }, { status: 401 })
  }

  return token
}
