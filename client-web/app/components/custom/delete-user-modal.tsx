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
import { AlertTriangle } from "lucide-react"

type User = {
  id: string
  username: string
  email: string
  status: "active" | "inactive"
  joinDate: string
  huntsCreated: number
  huntsParticipated: number
}

interface DeleteUserModalProps {
  isOpen: boolean
  onClose: () => void
  user: User
  onDeleteUser: (userId: string) => void
}

export function DeleteUserModal({ isOpen, onClose, user, onDeleteUser }: DeleteUserModalProps) {
  const handleDelete = () => {
    onDeleteUser(user.id)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg">Delete User</DialogTitle>
              <DialogDescription>
                This action cannot be undone. Are you sure you want to delete this user?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <h4 className="mb-2 font-medium text-gray-900">User Details:</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Status:</strong> {user.status}
              </p>
              <p>
                <strong>Hunts Created:</strong> {user.huntsCreated}
              </p>
              <p>
                <strong>Hunts Participated:</strong> {user.huntsParticipated}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> Deleting this user will permanently remove all their data,
              including their hunt history and any content they've created.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Delete User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
