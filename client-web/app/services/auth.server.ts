import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node"

import { authCookie } from "./cookies.server"

export async function requireAuth({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie")

  const token = await authCookie.parse(cookieHeader)

  if (!token) {
    throw json({ error: "Unauthorized" }, { status: 401 })
  }

  return token
}

export const logout = async () => {
  return redirect("/login", {
    headers: {
      "Set-Cookie": await authCookie.serialize("", { maxAge: 0 })
    }
  })
}

export const loader = async ({ request }: { request: Request }) => {
  const cookieHeader = request.headers.get("Cookie")
  const token = await authCookie.parse(cookieHeader)
  return json({ isAuthenticated: Boolean(token) })
}
