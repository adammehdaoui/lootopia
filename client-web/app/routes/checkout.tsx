// Checkout.tsx

import { CheckoutForm } from "@/components/custom/checkout-form"
import { useSession } from "@/contexts/auth-context"
import { createPayment } from "@/services/payments"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useQuery } from "@tanstack/react-query"

export default function CheckoutWrapper() {
  const { token, stripe_public_key } = useSession()

  const stripePromise = loadStripe(stripe_public_key ?? "")

  const {
    isPending,
    error,
    data: clientSecret
  } = useQuery({
    queryKey: ["payment-intent"],
    queryFn: async () => await createPayment(token, 7777)
  })

  if (isPending) {
    return (
      <div className="mt-16 flex h-full w-full items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Loading...</h1>
      </div>
    )
  }

  if (error || !clientSecret) {
    return (
      <div className="mt-16 flex h-full w-full items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">
          Error: {error?.message ?? "Unknown error"}
        </h1>
      </div>
    )
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  )
}
