import { createCookie } from "@remix-run/node"

export const authCookie = createCookie("token", {
  secure: process.env.NODE_ENV === "production",
  path: "/",
  sameSite: "lax"
})
