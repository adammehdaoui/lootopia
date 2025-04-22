import { withZodValidation } from "@/helpers/withZodValidation"
import axiosClient from "@/lib/client"
import { avatarSchema, avatarUrl } from "@/schema/avatar-schema"

export const uploadAvatar = async (file: FormDataEntryValue, token: string) => {
  const formData = new FormData()
  formData.append("file", file as Blob)

  return withZodValidation(avatarSchema)(
    axiosClient.post("/members/avatar", formData, { headers: { Authorization: token } })
  )
}

export const getAvatar = async (token: string | null) => {
  if (!token) {
    return null
  }

  return withZodValidation(avatarUrl)(
    axiosClient.get("/members/avatar", { headers: { Authorization: token } })
  )
}
