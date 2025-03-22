import axiosClient from "@/lib/client"
import { isAxiosError } from "axios"

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
    return response.data // Contient le token
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data // On récupère l'erreur de l'API
    } else {
      throw { error: "Une erreur est survenue" }
    }
  }
}
