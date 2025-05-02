"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export type NewHunt = {
  id: string
  name: string
  description: string
  latitude: number
  longitude: number
  startTime: string
  endTime: string
}

interface CreateHuntModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateHunt: (hunt: NewHunt) => void
}

export function CreateHuntModal({ isOpen, onClose, onCreateHunt }: CreateHuntModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [latitude, setLatitude] = useState(48.8566) // Default to Paris
  const [longitude, setLongitude] = useState(2.3522)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [minEndDate, setMinEndDate] = useState("")
  const [isClient, setIsClient] = useState(false)
  const { toast } = useToast()

  // Use this to ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Update minimum end date when start date changes
  useEffect(() => {
    if (startDate) {
      setMinEndDate(startDate)

      // If current end date is before new start date, reset it
      if (endDate && new Date(endDate) < new Date(startDate)) {
        setEndDate("")
      }
    }
  }, [startDate, endDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate dates
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (end <= start) {
      toast({
        title: "Invalid date range",
        description: "End date must be after start date",
        variant: "destructive"
      })
      return
    }

    // Generate a random ID for the new hunt
    const newHunt: NewHunt = {
      id: Math.random().toString(36).substring(2, 15),
      name,
      description,
      latitude,
      longitude,
      startTime: start.toISOString(),
      endTime: end.toISOString()
    }

    onCreateHunt(newHunt)
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setName("")
    setDescription("")
    setLatitude(48.8566)
    setLongitude(2.3522)
    setStartDate("")
    setEndDate("")
    setMinEndDate("")
  }

  if (!isClient) {
    return null // Don't render anything during SSR
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-2 border-white bg-royal text-white sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Create New Hunt</DialogTitle>
            <DialogDescription className="text-light">
              Fill in the details to create a new treasure hunt.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Hunt Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-white bg-deep text-white"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px] border-white bg-deep text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="0.000001"
                  value={latitude}
                  onChange={(e) => setLatitude(Number.parseFloat(e.target.value))}
                  className="border-white bg-deep text-white"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="0.000001"
                  value={longitude}
                  onChange={(e) => setLongitude(Number.parseFloat(e.target.value))}
                  className="border-white bg-deep text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border-white bg-deep text-white"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  min={minEndDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border-white bg-deep text-white"
                  required
                  disabled={!startDate}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-white hover:bg-deep"
            >
              Cancel
            </Button>
            <Button type="submit" variant="submit">
              Create Hunt
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
