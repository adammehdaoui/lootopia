import { withZodValidation } from "@/helpers/withZodValidation"
import axiosClient from "@/lib/client"
import type { HuntLike, LikeResponse } from "@/model/hunt"
import { huntsLikeListSchema, likeResponseSchema } from "@/schema/hunt-schema"

export const hunts = async (token: string | null): Promise<HuntLike[]> => {
  if (!token) {
    throw new Error("Token is required to fetch hunts")
  }

  return withZodValidation(huntsLikeListSchema)(
    axiosClient.get("/hunts/popularity", { headers: { Authorization: `${token}` } })
  )
}

export const like = async (huntId: string, token: string): Promise<LikeResponse> => {
  return withZodValidation(likeResponseSchema)(
    axiosClient.post(`/hunts/${huntId}/like`, {}, { headers: { Authorization: `${token}` } })
  )
}

export const unlike = async (huntId: string, token: string): Promise<LikeResponse> => {
  return withZodValidation(likeResponseSchema)(
    axiosClient.delete(`/hunts/${huntId}/like`, { headers: { Authorization: `${token}` } })
  )
}
