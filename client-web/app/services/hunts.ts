import { withZodValidation } from "@/helpers/withZodValidation"
import axiosClient from "@/lib/client"
import type { HuntLike } from "@/model/hunt"
import { huntsLikeListSchema } from "@/schema/hunt-schema"

export const hunts = async (): Promise<HuntLike[]> => {
  return withZodValidation(huntsLikeListSchema)(
    axiosClient.get("/hunts/popularity?memberId=62ab98f9-ca06-4649-a814-c558691451b1")
    // current user - temporary hardcoded
  )
}
