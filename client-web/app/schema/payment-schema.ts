import { z } from "zod"

export const paymentSchema = z.object({
  clientToken: z.string()
})
