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
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

type NewHunt = {
  name: string
  description: string | null
  latitude: number
  longitude: number
  startTime: string
  endTime: string
}

interface AddHuntModalProps {
  isOpen: boolean
  onClose: () => void
  onAddHunt: (hunt: NewHunt) => void
}

export function AddHuntModal({ isOpen, onClose, onAddHunt }: AddHuntModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [latitude, setLatitude] = useState(48.8566) // Default to Paris
  const [longitude, setLongitude] = useState(2.3522)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast({
        title: "Validation Error",
        description: "Hunt name is required.",
        variant: "destructive"
      })
      return
    }

    if (!startDate || !endDate) {
      toast({
        title: "Validation Error",
        description: "Start and end dates are required.",
        variant: "destructive"
      })
      return
    }

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (end <= start) {
      toast({
        title: "Validation Error",
        description: "End date must be after start date.",
        variant: "destructive"
      })
      return
    }

    const newHunt: NewHunt = {
      name: name.trim(),
      description: description.trim() || null,
      latitude,
      longitude,
      startTime: start.toISOString(),
      endTime: end.toISOString()
    }

    onAddHunt(newHunt)
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
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Hunt</DialogTitle>
            <DialogDescription>
              Create a new treasure hunt. Fill in the required information below.
            </DialogDescription>
          </DialogHeader>

          <div className="grid max-h-[60vh] gap-4 overflow-y-auto py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Hunt Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter hunt name"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter hunt description (optional)"
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="latitude">Latitude *</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="0.000001"
                  value={latitude}
                  onChange={(e) => setLatitude(Number.parseFloat(e.target.value))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="longitude">Longitude *</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="0.000001"
                  value={longitude}
                  onChange={(e) => setLongitude(Number.parseFloat(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Create Hunt</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
