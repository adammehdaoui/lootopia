"use client"

import { useState } from "react"
import { useCrowns } from "@/contexts/crown-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Crown } from "lucide-react"

export default function CrownPage() {
  const { addCrowns } = useCrowns()
  const [purchaseSuccess, setPurchaseSuccess] = useState<number | null>(null)

  const offers = [
    { id: 1, price: 0.99, crowns: 20, popular: false },
    { id: 2, price: 4.99, crowns: 100, popular: false },
    { id: 3, price: 9.99, crowns: 250, popular: true },
    { id: 4, price: 24.99, crowns: 650, popular: false },
    { id: 5, price: 49.99, crowns: 1400, popular: false },
    { id: 6, price: 99.99, crowns: 3000, popular: false }
  ]

  const handleBuyCrowns = (amount: number) => {
    addCrowns(amount)
    setPurchaseSuccess(amount)

    // Réinitialiser le message de succès après 3 secondes
    setTimeout(() => {
      setPurchaseSuccess(null)
    }, 3000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Boutique de Couronnes</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Achetez des couronnes pour débloquer du contenu premium
        </p>
      </div>

      {purchaseSuccess && (
        <div className="relative mb-6 rounded border border-green-400 bg-green-100 px-4 py-3 text-center text-green-700">
          <span className="block sm:inline">
            Félicitations! Vous avez acheté {purchaseSuccess} couronnes.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <Card
            key={offer.id}
            className="overflow-hidden rounded-xl border border-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg dark:border-gray-700"
          >
            {offer.popular && (
              <div className="bg-purple-600 py-1 text-center font-bold text-white">
                OFFRE POPULAIRE
              </div>
            )}
            <div className="flex flex-col items-center p-6">
              <div className="relative mb-4 flex h-24 w-24 items-center justify-center">
                <Crown className="h-16 w-16 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {offer.crowns} Couronnes
              </h2>
              <div className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                {offer.price.toFixed(2)} €
              </div>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {(offer.price / offer.crowns).toFixed(3)} € par couronne
              </div>
              {offer.popular && (
                <div className="mt-3 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  MEILLEURE VALEUR
                </div>
              )}
            </div>
            <div className="p-4 pt-0">
              <Button
                onClick={() => handleBuyCrowns(offer.crowns)}
                className="w-full bg-purple-600 py-3 font-bold text-white hover:bg-purple-700"
              >
                Acheter
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          Les achats sont traités de manière sécurisée. Les couronnes sont créditées instantanément
          sur votre compte.
        </p>
        <p className="mt-2">Besoin d'aide ? Contactez notre support client.</p>
      </div>
    </div>
  )
}
