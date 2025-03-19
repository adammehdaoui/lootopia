import axiosClient from "@/lib/client"

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
