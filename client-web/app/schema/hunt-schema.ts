import { z } from "zod"

export const huntSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  latitude: z.number(),
  longitude: z.number(),
  startTime: z.string(),
  endTime: z.string(),
  owner: z.string().optional().nullable(),
  likes: z.array(z.object({ id: z.string() })).optional()
})

export const huntLikeSchema = z.object({
  huntDto: huntSchema,
  likedBy: z.boolean(),
  likeCount: z.number()
})

export const memberLikeSchema = z.object({
  id: z.string().uuid(),
  username: z.string().email(),
  email: z.string().email(),
  password: z.string(),
  active: z.boolean(),
  activationCode: z.string().uuid(),
  roles: z.array(z.any()),
  owned: z.array(z.any()),
  huntsLikes: z.array(z.object({ id: z.string() })).optional()
})

export const likeResponseSchema = z.object({
  id: z.string().uuid(),
  hunt: huntSchema,
  member: memberLikeSchema
})

export const huntsListSchema = z.array(huntSchema)

export const huntsLikeListSchema = z.array(huntLikeSchema)
