import { withZodValidation } from "@/helpers/withZodValidation"
import axiosClient from "@/lib/client"
import { paymentSchema } from "@/schema/payment-schema"

export const createPayment = async (token: string | null, amount: number): Promise<string> => {
  if (!token) {
    throw new Error("Token is required to create a payment")
  }

  console.log("Creating payment with amount:", amount)

  const response = await withZodValidation(paymentSchema)(
    axiosClient.post("/payments", { amount }, { headers: { Authorization: token } })
  )

  if (!response.clientToken) {
    throw new Error("Failed to create payment")
  }

  console.log("Payment created successfully:", response.clientToken)

  return response.clientToken
}
