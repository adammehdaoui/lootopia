import { createCookie } from "@remix-run/node"

export const authCookie = createCookie("token", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  sameSite: "strict"
})
