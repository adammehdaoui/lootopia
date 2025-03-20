import { z } from "zod"

export const huntSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  latitude: z.number(),
  longitude: z.number(),
  startTime: z.string(),
  endTime: z.string()
})

export const huntLikeSchema = z.object({
  huntDto: huntSchema,
  likedBy: z.boolean(),
  likeCount: z.number()
})

export const huntsListSchema = z.array(huntSchema)

export const huntsLikeListSchema = z.array(huntLikeSchema)
