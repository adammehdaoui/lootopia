import { z } from "zod"

export const huntSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  startTime: z.string(),
  endTime: z.string()
})

export const huntsListSchema = z.array(huntSchema)
