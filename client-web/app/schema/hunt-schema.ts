import { z } from "zod"

export const huntSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  latitude: z.number(),
  longitude: z.number(),
  startTime: z.string().nullable(),
  endTime: z.string().nullable()
})

export const huntsListSchema = z.array(huntSchema)
