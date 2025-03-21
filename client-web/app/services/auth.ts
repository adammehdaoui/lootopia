import { withZodValidation } from "@/helpers/withZodValidation"
import axiosClient from "@/lib/client"
import { registerSchema } from "@/schema/register-schema"

export const confirm = async (code: string, mail: string) => {
  const result = await axiosClient.post("/auth/activate", { activationCode: code, mail })

  return result.data
}

export const register = async (email: FormDataEntryValue, password: FormDataEntryValue) => {
  return withZodValidation(registerSchema)(
    axiosClient.post("/auth/register", { to: email, rawPassword: password })
  )
}
