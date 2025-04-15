import { authSchema } from "@/schema/auth-schema"
import { z } from "zod"

export type Activate = z.infer<typeof authSchema>
