import { authSchema } from "@/schema/auth-schema"
import { z } from "zod"

export type Register = z.infer<typeof authSchema>
