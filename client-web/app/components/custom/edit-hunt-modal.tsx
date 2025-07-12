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

type Hunt = {
  id: string
  name: string
  description: string | null
  latitude: number
  longitude: number
  startTime: string
  endTime: string
  owner: string | null
  likes: any[]
}

type HuntLike = {
  huntDto: Hunt
  likedBy: boolean
  likeCount: number
}

interface EditHuntModalProps {
  isOpen: boolean
  onClose: () => void
  hunt: HuntLike | null
  onEditHunt: (hunt: HuntLike) => void
}

export function EditHuntModal({ isOpen, onClose, hunt, onEditHunt }: EditHuntModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [latitude, setLatitude] = useState(48.8566)
  const [longitude, setLongitude] = useState(2.3522)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const { toast } = useToast()

  // Initialize form with hunt data when modal opens
  useEffect(() => {
    if (hunt && isOpen) {
      setName(hunt.huntDto.name)
      setDescription(hunt.huntDto.description || "")
      setLatitude(hunt.huntDto.latitude)
      setLongitude(hunt.huntDto.longitude)

      // Convert ISO strings to datetime-local format
      const startDateTime = new Date(hunt.huntDto.startTime)
      const endDateTime = new Date(hunt.huntDto.endTime)

      setStartDate(startDateTime.toISOString().slice(0, 16))
      setEndDate(endDateTime.toISOString().slice(0, 16))
    }
  }, [hunt, isOpen])

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setName("")
      setDescription("")
      setLatitude(48.8566)
      setLongitude(2.3522)
      setStartDate("")
      setEndDate("")
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!hunt) return

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

    const updatedHunt: HuntLike = {
      ...hunt,
      huntDto: {
        ...hunt.huntDto,
        name: name.trim(),
        description: description.trim() || null,
        latitude,
        longitude,
        startTime: start.toISOString(),
        endTime: end.toISOString()
      }
    }

    onEditHunt(updatedHunt)
    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  if (!hunt) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Hunt</DialogTitle>
            <DialogDescription>
              Update hunt information. Make your changes and click save.
            </DialogDescription>
          </DialogHeader>

          <div className="grid max-h-[60vh] gap-4 overflow-y-auto py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Hunt Name *</Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter hunt name"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter hunt description (optional)"
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-latitude">Latitude *</Label>
                <Input
                  id="edit-latitude"
                  type="number"
                  step="0.000001"
                  value={latitude}
                  onChange={(e) => setLatitude(Number.parseFloat(e.target.value))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-longitude">Longitude *</Label>
                <Input
                  id="edit-longitude"
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
                <Label htmlFor="edit-startDate">Start Date *</Label>
                <Input
                  id="edit-startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-endDate">End Date *</Label>
                <Input
                  id="edit-endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Hunt ID</Label>
                <Input value={hunt.huntDto.id} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Total Likes</Label>
                <Input value={hunt.likeCount.toString()} disabled />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
