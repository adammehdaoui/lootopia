"use client"

import { useState } from "react"
import { useCrowns } from "@/contexts/crown-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Crown } from "lucide-react"
import { PaymentModal } from "@/components/custom/payment-modal"

export default function CrownShop() {
  const { addCrowns } = useCrowns()
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState<{ crowns: number; price: number } | null>(null)

  const offers = [
    { id: 1, price: 0.99, crowns: 20 },
    { id: 2, price: 4.99, crowns: 100 },
    { id: 3, price: 9.99, crowns: 250 },
    { id: 4, price: 24.99, crowns: 650 },
    { id: 5, price: 49.99, crowns: 1400 },
    { id: 6, price: 99.99, crowns: 3000 }
  ]

  const handleOpenPaymentModal = (crowns: number, price: number) => {
    setSelectedOffer({ crowns, price })
    setIsPaymentModalOpen(true)
  }

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false)
    setSelectedOffer(null)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-white md:text-5xl">
          Shop of <span className="text-yellow-400">crowns</span> 👑
        </h1>
        <p className="mt-4 font-biorhyme text-xl text-gray-300 dark:text-gray-300">
          Buy crowns to unlock premium content
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <Card
            key={offer.id}
            className="overflow-hidden rounded-xl border border-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg dark:border-gray-700"
          >
            <div className="flex flex-col items-center p-6">
              <div className="relative mb-4 flex h-24 w-24 items-center justify-center">
                <Crown className="h-16 w-16 text-deep" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {offer.crowns} Crowns
              </h2>
              <div className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                {offer.price.toFixed(2)} €
              </div>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {(offer.price / offer.crowns).toFixed(3)} € per crown
              </div>
            </div>
            <div className="flex justify-center p-4 pt-0">
              <Button
                onClick={() => handleOpenPaymentModal(offer.crowns, offer.price)}
                variant="navigation"
              >
                Buy
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {selectedOffer && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={handleClosePaymentModal}
          crownAmount={selectedOffer.crowns}
          price={selectedOffer.price}
        />
      )}

      <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Purchases are securely processed. Crowns are credited instantly to your account.</p>
        <p className="mt-2">Need help? Contact our support team.</p>
      </div>
    </div>
  )
}
