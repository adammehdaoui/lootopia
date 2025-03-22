import { createCookie } from "@remix-run/node"

export const authTokenCookie = createCookie("token", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  sameSite: "lax"
})

export async function getCookie(request: Request, name: string) {
  const cookieHeader = request.headers.get("Cookie")
  const cookies = (await authTokenCookie.parse(cookieHeader)) || {}
  return cookies[name]
}
