"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"

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

interface DeleteHuntModalProps {
  isOpen: boolean
  onClose: () => void
  hunt: HuntLike | null
  onDeleteHunt: (huntId: string) => void
}

export function DeleteHuntModal({ isOpen, onClose, hunt, onDeleteHunt }: DeleteHuntModalProps) {
  const handleDelete = () => {
    if (hunt) {
      onDeleteHunt(hunt.huntDto.id)
      onClose()
    }
  }

  const handleClose = () => {
    onClose()
  }

  if (!hunt) return null

  const getHuntStatus = () => {
    const currentTime = new Date().toISOString()
    if (currentTime >= hunt.huntDto.startTime && currentTime <= hunt.huntDto.endTime) {
      return { label: "Live", variant: "default" as const }
    }
    if (currentTime < hunt.huntDto.startTime) {
      return { label: "Upcoming", variant: "secondary" as const }
    }
    return { label: "Past", variant: "outline" as const }
  }

  const huntStatus = getHuntStatus()

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg">Delete Hunt</DialogTitle>
              <DialogDescription>
                This action cannot be undone. Are you sure you want to delete this hunt?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <h4 className="mb-3 font-medium text-gray-900">Hunt Details:</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <strong>Name:</strong>
                <span>{hunt.huntDto.name}</span>
              </div>
              <div className="flex justify-between">
                <strong>Status:</strong>
                <Badge variant={huntStatus.variant}>{huntStatus.label}</Badge>
              </div>
              <div className="flex justify-between">
                <strong>Description:</strong>
                <span className="max-w-xs truncate text-right">
                  {hunt.huntDto.description || "No description"}
                </span>
              </div>
              <div className="flex justify-between">
                <strong>Start Date:</strong>
                <span>{new Date(hunt.huntDto.startTime).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <strong>End Date:</strong>
                <span>{new Date(hunt.huntDto.endTime).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <strong>Location:</strong>
                <span>
                  {hunt.huntDto.latitude.toFixed(4)}, {hunt.huntDto.longitude.toFixed(4)}
                </span>
              </div>
              <div className="flex justify-between">
                <strong>Total Likes:</strong>
                <span>{hunt.likeCount}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> Deleting this hunt will permanently remove all associated
              data, including participant history, likes, and any related content.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Delete Hunt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
