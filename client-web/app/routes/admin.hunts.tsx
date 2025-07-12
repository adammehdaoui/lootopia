"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { useState, useCallback } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useSession } from "@/contexts/auth-context"
import { QueryHandler } from "@/handlers/query-handler"
import { hunts } from "@/services/hunts"
import { useQuery } from "@tanstack/react-query"

import { useToast } from "@/hooks/use-toast"
import { AddHuntModal } from "@/components/custom/add-hunt-modal"
import { EditHuntModal } from "@/components/custom/edit-hunt-modal"
import { DeleteHuntModal } from "@/components/custom/delete-hunt-modal"

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

export default function AdminHunts() {
  const { token } = useSession()
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedHunt, setSelectedHunt] = useState<HuntLike | null>(null)
  const [customHunts, setCustomHunts] = useState<HuntLike[]>([])
  const { toast } = useToast()

  const { isPending, error, data } = useQuery({
    queryKey: ["admin-hunts"],
    queryFn: async () => {
      return await hunts(token)
    }
  })

  const getHuntStatus = (hunt: Hunt) => {
    const currentTime = new Date().toISOString()
    if (currentTime >= hunt.startTime && currentTime <= hunt.endTime) {
      return { status: "live", label: "Live", variant: "default" as const }
    }
    if (currentTime < hunt.startTime) {
      return { status: "upcoming", label: "Upcoming", variant: "secondary" as const }
    }
    return { status: "past", label: "Past", variant: "outline" as const }
  }

  // Combine API data with custom hunts
  const allHunts = [...customHunts, ...(data || [])]

  const filteredHunts = allHunts.filter(
    (hunt: HuntLike) =>
      hunt.huntDto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (hunt.huntDto.description &&
        hunt.huntDto.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleAddHunt = useCallback(
    (newHunt: Omit<Hunt, "id" | "owner" | "likes">) => {
      const hunt: Hunt = {
        ...newHunt,
        id: Math.random().toString(36).substring(2, 15),
        owner: null,
        likes: []
      }

      const huntLike: HuntLike = {
        huntDto: hunt,
        likedBy: false,
        likeCount: 0
      }

      setCustomHunts((prev) => [huntLike, ...prev])
      toast({
        title: "Hunt created",
        description: `${hunt.name} has been successfully created.`
      })
    },
    [toast]
  )

  const handleEditHunt = useCallback(
    (updatedHunt: HuntLike) => {
      // Update in custom hunts if it exists there
      setCustomHunts((prev) =>
        prev.map((hunt) => (hunt.huntDto.id === updatedHunt.huntDto.id ? updatedHunt : hunt))
      )

      toast({
        title: "Hunt updated",
        description: `${updatedHunt.huntDto.name} has been successfully updated.`
      })
    },
    [toast]
  )

  const handleDeleteHunt = useCallback(
    (huntId: string) => {
      const huntToDelete = allHunts.find((hunt) => hunt.huntDto.id === huntId)

      // Remove from custom hunts
      setCustomHunts((prev) => prev.filter((hunt) => hunt.huntDto.id !== huntId))

      toast({
        title: "Hunt deleted",
        description: `${huntToDelete?.huntDto.name} has been successfully deleted.`,
        variant: "destructive"
      })
    },
    [toast]
  )

  const openEditModal = useCallback((hunt: HuntLike) => {
    setSelectedHunt(hunt)
    setIsEditModalOpen(true)
  }, [])

  const openDeleteModal = useCallback((hunt: HuntLike) => {
    setSelectedHunt(hunt)
    setIsDeleteModalOpen(true)
  }, [])

  const closeEditModal = useCallback(() => {
    setIsEditModalOpen(false)
    setSelectedHunt(null)
  }, [])

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false)
    setSelectedHunt(null)
  }, [])

  const closeAddModal = useCallback(() => {
    setIsAddModalOpen(false)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hunts Management</h1>
          <p className="text-gray-600">Manage treasure hunts and their settings</p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Create Hunt
        </Button>
      </div>

      <QueryHandler isPending={isPending} error={error}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Hunts ({filteredHunts.length})</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search hunts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Hunt Name</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Start Date</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">End Date</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Likes</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Location</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHunts.map((hunt: HuntLike) => {
                    const huntStatus = getHuntStatus(hunt.huntDto)
                    return (
                      <tr key={hunt.huntDto.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium text-gray-900">{hunt.huntDto.name}</div>
                            <div className="max-w-xs truncate text-sm text-gray-500">
                              {hunt.huntDto.description || "No description"}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={huntStatus.variant}>{huntStatus.label}</Badge>
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {new Date(hunt.huntDto.startTime).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {new Date(hunt.huntDto.endTime).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{hunt.likeCount}</td>
                        <td className="px-4 py-3 text-gray-600">
                          <div className="text-sm">
                            {hunt.huntDto.latitude.toFixed(4)}, {hunt.huntDto.longitude.toFixed(4)}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openEditModal(hunt)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Hunt
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => openDeleteModal(hunt)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Hunt
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </QueryHandler>

      {/* Modals */}
      <AddHuntModal isOpen={isAddModalOpen} onClose={closeAddModal} onAddHunt={handleAddHunt} />

      <EditHuntModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        hunt={selectedHunt}
        onEditHunt={handleEditHunt}
      />

      <DeleteHuntModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        hunt={selectedHunt}
        onDeleteHunt={handleDeleteHunt}
      />
    </div>
  )
}
