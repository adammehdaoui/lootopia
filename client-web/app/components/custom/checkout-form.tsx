import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Form, useSearchParams } from "@remix-run/react"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useEffect } from "react"

export function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const { toast } = useToast()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.has("success")) {
      toast({
        title: "Payment Successful",
        description: "Thank you for your payment!"
      })
    }

    if (searchParams.has("error")) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment.",
        variant: "destructive"
      })
    }
  }, [searchParams, toast])

  const onSubmit = async () => {
    if (!stripe || !elements) {
      console.error("Stripe or Elements not loaded")
      return
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `/checkout?success`
      }
    })

    if (result.error) {
      window.location.href = "/checkout?error"
    }
  }

  return (
    <Form className="mt-16 flex w-full justify-center">
      <PaymentElement />
      <Button onClick={onSubmit} variant="submit">
        Submit
      </Button>
    </Form>
  )
}
