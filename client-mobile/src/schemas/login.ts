import { z } from "zod";

export const loginSchema = {
  token: z.string(),
};
