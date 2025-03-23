import { data, redirect, type LoaderFunctionArgs } from "@remix-run/node"

import { authCookie } from "./cookies.server"

export async function requireAuth({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie")

  const token = await authCookie.parse(cookieHeader)

  if (!token) {
    throw data({ error: "Unauthorized" }, { status: 401 })
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
