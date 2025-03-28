import { ZodError, ZodSchema } from "zod"

export const withZodValidation =
  <T>(schema: ZodSchema<T>) =>
  async (promise: Promise<Result<T>>) => {
    try {
      const result = await promise

      const data = schema.parse(result.data)

      return data
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        console.error("Zod validation error(s): ", error.errors)
        throw new Error("Server data is not valid")
      }

      console.error("Unknown error: ", error)
      throw new Error("Unknown error")
    }
  }

type Result<T> = {
  data: Array<T> | T
}
