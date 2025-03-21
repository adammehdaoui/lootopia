import { withZodValidation } from "@/helpers/withZodValidation"
import axiosClient from "@/lib/client"
import { authSchema } from "@/schema/auth-schema"

export const confirm = async (code: string, mail: string) => {
  return withZodValidation(authSchema)(
    axiosClient.post("/auth/activate", { activationCode: code, mail })
  )
}

export const register = async (email: FormDataEntryValue, password: FormDataEntryValue) => {
  return withZodValidation(authSchema)(
    axiosClient.post("/auth/register", { to: email, rawPassword: password })
  )
}
