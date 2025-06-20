import axiosClient from "@/lib/client"
import { test } from "@/services/test"
import { CustomJwtPayload } from "@/types/custom-jwt-payload"
import { data, redirect, type LoaderFunctionArgs } from "@remix-run/node"
import { HttpStatusCode, isAxiosError } from "axios"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import { jwtDecode } from "jwt-decode"
import { authCookie } from "./cookies"

export const auth = async (args: LoaderFunctionArgs, withRedirect: boolean) => {
  try {
    const token = await requireAuth(args)
    const payload = jwtDecode<CustomJwtPayload>(token)

    const username = payload.sub
    const id = payload.id

    if (!username) {
      throw new Error("Username not found in token")
    }

    return data({
      message: withRedirect
        ? `${ReasonPhrases.OK}: You have access to this route`
        : `${ReasonPhrases.ACCEPTED}: You have access to this route`,
      status: withRedirect ? StatusCodes.OK : StatusCodes.ACCEPTED,
      connected: true,
      username,
      id,
      token
    })
  } catch {
    if (withRedirect) {
      console.error("Unauthorized")
      return redirect("/login")
    }

    return data({
      message: `${ReasonPhrases.ACCEPTED}: You have access to this route`,
      status: StatusCodes.ACCEPTED,
      connected: false,
      id: null,
      username: null,
      token: null
    })
  }
}

export const confirm = async (code: string, mail: string) => {
  const result = await axiosClient.post("/auth/activate", { activationCode: code, mail })

  return result.data
}

export const register = async (email: FormDataEntryValue, password: FormDataEntryValue) => {
  return await axiosClient.post("/auth/register", { to: email, rawPassword: password })
}

export const login = async (email: FormDataEntryValue, password: FormDataEntryValue) => {
  try {
    const response = await axiosClient.post("/auth/login", { email, password })
    return response.data
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data
    } else {
      throw new Error("Une erreur est survenue")
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

export async function requireAuth({ request }: { request: Request }) {
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
