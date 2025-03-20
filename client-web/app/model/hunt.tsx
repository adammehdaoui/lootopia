import { huntLikeSchema, huntSchema } from "@/schema/hunt-schema"
import { z } from "zod"

export type Hunt = z.infer<typeof huntSchema>

export type HuntLike = z.infer<typeof huntLikeSchema>
