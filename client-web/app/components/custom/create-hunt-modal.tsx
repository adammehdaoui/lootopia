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
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate a random ID for the new hunt
    const newHunt: NewHunt = {
      id: Math.random().toString(36).substring(2, 15),
      name,
      description,
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
      startTime: new Date(startDate).toISOString(),
      endTime: new Date(endDate).toISOString()
    }

    onCreateHunt(newHunt)
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setName("")
    setDescription("")
    setLatitude("")
    setLongitude("")
    setStartDate("")
    setEndDate("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-2 border-white bg-royal text-white sm:max-w-[500px]">
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
                  onChange={(e) => setLatitude(e.target.value)}
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
                  onChange={(e) => setLongitude(e.target.value)}
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
                  type="datetime-local"
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
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border-white bg-deep text-white"
                  required
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
