import { z } from "zod"

export const registerSchema = z.object({
  username: z.string(),
  authrorities: z.array(z.string()),
  password: z.string(),
  credentialsNonExpired: z.boolean(),
  accountNonExpired: z.boolean(),
  accountNonLocked: z.boolean()
})
