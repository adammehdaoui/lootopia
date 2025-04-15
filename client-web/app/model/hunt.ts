import { huntLikeSchema, huntSchema, likeResponseSchema } from "@/schema/hunt-schema"
import { z } from "zod"

export type Hunt = z.infer<typeof huntSchema>

export type HuntLike = z.infer<typeof huntLikeSchema>

export type LikeResponse = z.infer<typeof likeResponseSchema>
