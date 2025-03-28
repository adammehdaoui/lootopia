import axiosClient from "@/lib/client"
import { test } from "@/services/test"
import { data, redirect, type LoaderFunctionArgs } from "@remix-run/node"
import { HttpStatusCode, isAxiosError } from "axios"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import { authCookie } from "./cookies"

export const auth = async (args: LoaderFunctionArgs, withRedirect: boolean) => {
  try {
    await requireAuth(args)
    return data({
      message: withRedirect
        ? `${ReasonPhrases.OK}: You have access to this route`
        : `${ReasonPhrases.ACCEPTED}: You have access to this route`,
      status: withRedirect ? StatusCodes.OK : StatusCodes.ACCEPTED,
      connected: true
    })
  } catch {
    if (withRedirect) {
      console.error("Unauthorized")
      return redirect("/login")
    }

    return data({
      message: `${ReasonPhrases.ACCEPTED}: You have access to this route`,
      status: StatusCodes.ACCEPTED,
      connected: false
    })
  }
}

export const confirm = async (code: string, mail: string) => {
  const result = await axiosClient.post(
    "/auth/activate",
    { activationCode: code, mail },
    {
      headers: { "Content-Type": "application/json" }
    }
  )

  return result.data
}

export const register = async (email: FormDataEntryValue, password: FormDataEntryValue) => {
  return await axiosClient.post(
    "/auth/register",
    { to: email, rawPassword: password },
    {
      headers: { "Content-Type": "application/json" }
    }
  )
}

export const login = async (email: FormDataEntryValue, password: FormDataEntryValue) => {
  try {
    const response = await axiosClient.post(
      "/auth/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    return response.data
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data
    } else {
      throw { error: "Une erreur est survenue" }
    }
  }
}

export const logout = async () => {
  return redirect("/login", {
    headers: {
      "Set-Cookie": await authCookie.serialize(null, { maxAge: -1 })
    }
  })
}

export async function requireAuth({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie")

  const token = await authCookie.parse(cookieHeader)

  if (!token) {
    throw new Error("Unauthorized, token not found")
  }

  const response = await test(token)

  if (response.status === HttpStatusCode.Unauthorized) {
    throw new Error("Unauthorized, invalid token")
  }

  return token
}

export async function requireDisconnect({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie")

  const token = await authCookie.parse(cookieHeader)

  if (token) {
    throw new Error("You are already connected")
  }
}
