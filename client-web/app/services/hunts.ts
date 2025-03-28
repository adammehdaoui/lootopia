import { withZodValidation } from "@/helpers/withZodValidation"
import axiosClient from "@/lib/client"
import type { Hunt } from "@/model/hunt"
import { huntsListSchema } from "@/schema/hunt-schema"

export const hunts = async (): Promise<Hunt[]> => {
  return withZodValidation(huntsListSchema)(axiosClient.get("/hunts/popularity"))
}
