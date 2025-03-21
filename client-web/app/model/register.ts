import { registerSchema } from "@/schema/register-schema"
import { z } from "zod"

export type Register = z.infer<typeof registerSchema>
