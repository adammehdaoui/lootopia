import { withZodValidation } from "@/helpers/withZodValidation"
import axiosClient from "@/lib/client"
import { avatarSchema } from "@/schema/avatar-schema"

export const uploadAvatar = async (file: FormDataEntryValue, token: string) => {
  const formData = new FormData()
  formData.append("file", file as Blob)

  return withZodValidation(avatarSchema)(
    axiosClient.post("/members/avatar", formData, { headers: { Authorization: token } })
  )
}
