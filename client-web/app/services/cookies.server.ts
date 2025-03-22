import { createCookie } from "@remix-run/node"

export const authCookie = createCookie("token", {
  secure: process.env.NODE_ENV === "production",
  path: "/",
  sameSite: "lax"
})

export async function getTokenFromCookie(request: Request) {
  const cookieHeader = request.headers.get("Cookie")

  const token = (await authCookie.parse(cookieHeader)) || {}

  return token
}
