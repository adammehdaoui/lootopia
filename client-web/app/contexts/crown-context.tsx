"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type CrownContextType = {
  crownBalance: number
  addCrowns: (amount: number) => void
}

const CrownContext = createContext<CrownContextType | undefined>(undefined)

export function CrownProvider({ children }: { children: React.ReactNode }) {
  const [crownBalance, setCrownBalance] = useState(0)

  // Charger le solde depuis localStorage au démarrage
  useEffect(() => {
    const savedBalance = localStorage.getItem("crownBalance")
    if (savedBalance) {
      setCrownBalance(Number.parseInt(savedBalance, 10))
    }
  }, [])

  // Sauvegarder le solde dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("crownBalance", crownBalance.toString())
  }, [crownBalance])

  const addCrowns = (amount: number) => {
    setCrownBalance((prev) => prev + amount)
  }

  return (
    <CrownContext.Provider value={{ crownBalance, addCrowns }}>{children}</CrownContext.Provider>
  )
}

export function useCrowns() {
  const context = useContext(CrownContext)
  if (context === undefined) {
    throw new Error("useCrowns must be used within a CrownProvider")
  }
  return context
}
