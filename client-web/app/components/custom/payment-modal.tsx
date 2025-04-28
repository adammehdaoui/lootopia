"use client"

import type React from "react"

import { useState } from "react"
import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, CreditCard, Link2, Info } from "lucide-react"
import { useCrowns } from "@/contexts/crown-context"
import { useToast } from "@/hooks/use-toast"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  crownAmount: number
  price: number
}

export function PaymentModal({ isOpen, onClose, crownAmount, price }: PaymentModalProps) {
  const { addCrowns } = useCrowns()
  const [paymentMethod, setPaymentMethod] = useState<"card" | "klarna" | "afterpay">("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simuler un traitement de paiement
    setTimeout(() => {
      setIsProcessing(false)
      addCrowns(crownAmount)
      onClose()
      // Afficher une notification de succès
      toast({
        title: "Achat réussi !",
        description: ` ${crownAmount} couronnes ont été ajoutées à votre compte.`,
        variant: "default"
      })
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="max-h-[90vh] w-full max-w-xl overflow-auto rounded-xl bg-white">
          <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Paiement</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="mb-6">
              <div className="mb-4 flex space-x-2">
                <button
                  className={`flex flex-1 items-center justify-center space-x-2 rounded-lg border px-4 py-3 ${
                    paymentMethod === "card" ? "border-gray-300 bg-gray-100" : "border-gray-200"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <CreditCard size={20} className="text-gray-600" />
                  <span className="text-gray-700">Card</span>
                </button>
                <button
                  className={`flex flex-1 items-center justify-center space-x-2 rounded-lg border px-4 py-3 ${
                    paymentMethod === "klarna" ? "border-gray-300 bg-gray-100" : "border-gray-200"
                  }`}
                  onClick={() => setPaymentMethod("klarna")}
                >
                  <div className="rounded bg-pink-100 p-1">
                    <span className="font-bold text-pink-600">K.</span>
                  </div>
                  <span className="text-gray-700">Klarna</span>
                </button>
                <button
                  className={`flex flex-1 items-center justify-center space-x-2 rounded-lg border px-4 py-3 ${
                    paymentMethod === "afterpay" ? "border-gray-300 bg-gray-100" : "border-gray-200"
                  }`}
                  onClick={() => setPaymentMethod("afterpay")}
                >
                  <Link2 size={20} className="text-teal-500" />
                  <span className="text-gray-700">Afterpay</span>
                </button>
              </div>

              {paymentMethod === "card" && (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="bg-gray-50 pr-12"
                          required
                        />
                        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 space-x-1">
                          <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture%20d%E2%80%99e%CC%81cran%202025-04-28%20a%CC%80%2009.21.58-I1JfyiWbF5KZN6L80nSbAEaxfHGpld.png"
                            alt="Visa"
                            className="h-6 w-auto"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiration">Date d'expiration</Label>
                        <Input
                          id="expiration"
                          placeholder="MM/YY"
                          className="bg-gray-50"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <div className="relative">
                          <Input id="cvc" placeholder="123" className="bg-gray-50" required />
                          <Info
                            size={16}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="country">Pays</Label>
                        <select
                          id="country"
                          className="h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3"
                          defaultValue="FR"
                          required
                        >
                          <option value="FR">France</option>
                          <option value="US">États-Unis</option>
                          <option value="CA">Canada</option>
                          <option value="GB">Royaume-Uni</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="zip">Code postal</Label>
                        <Input id="zip" placeholder="75000" className="bg-gray-50" required />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full rounded-lg bg-purple-600 py-3 font-medium text-white hover:bg-purple-700"
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Traitement en cours..." : `Payer ${price.toFixed(2)} €`}
                      </Button>
                    </div>
                  </div>
                </form>
              )}

              {paymentMethod === "klarna" && (
                <div className="py-8 text-center">
                  <p className="mb-4 text-gray-600">Payer en 3 fois sans frais avec Klarna</p>
                  <Button
                    onClick={handleSubmit}
                    className="w-full rounded-lg bg-pink-600 py-3 font-medium text-white hover:bg-pink-700"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Traitement en cours..." : `Continuer avec Klarna`}
                  </Button>
                </div>
              )}

              {paymentMethod === "afterpay" && (
                <div className="py-8 text-center">
                  <p className="mb-4 text-gray-600">Payer en 4 fois sans frais avec Afterpay</p>
                  <Button
                    onClick={handleSubmit}
                    className="w-full rounded-lg bg-teal-600 py-3 font-medium text-white hover:bg-teal-700"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Traitement en cours..." : `Continuer avec Afterpay`}
                  </Button>
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="mb-2 flex justify-between">
                <span className="text-gray-600">Achat</span>
                <span className="font-medium">{crownAmount} couronnes</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{price.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
