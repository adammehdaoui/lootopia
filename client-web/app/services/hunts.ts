import axiosClient from "@/lib/client"
import type { Hunt } from "@/model/hunt"
import { huntsListSchema } from "@/schema/hunt-schema"

export const hunts = async (): Promise<Hunt[]> => {
  const result = await axiosClient.get("/hunts/popularity", {
    headers: { "Content-Type": "application/json" }
  })

  console.log(result.data)

  return huntsListSchema.parse(result.data)
}
