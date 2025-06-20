import { z } from "zod"

export const authSchema = z.object({
  username: z.string(),
  authorities: z.array(z.string()),
  password: z.string(),
  credentialsNonExpired: z.boolean(),
  accountNonExpired: z.boolean(),
  accountNonLocked: z.boolean()
})
