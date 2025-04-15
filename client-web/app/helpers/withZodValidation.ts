import { isAxiosError } from "axios"
import { ZodError, ZodSchema } from "zod"

export const withZodValidation =
  <T>(schema: ZodSchema<T>) =>
  async <E>(promise: Promise<Result<E>>) => {
    try {
      const result = await promise

      const data = schema.parse(result.data)

      return data
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        console.error("Zod validation error(s): ", error.errors)
        throw new Error("Server data is not valid")
      }

      if (isAxiosError(error)) {
        console.error(error.cause, error.message)
        throw new Error("Server error, please try again later (server may not be available)")
      }

      console.error("Unknown error: ", error)
      throw error
    }
  }

type Result<T> = {
  data: Array<T> | T
}
