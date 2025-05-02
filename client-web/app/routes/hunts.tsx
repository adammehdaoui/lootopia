"use client"

import { Button } from "@/components/ui/button"
import { HuntCard } from "@/components/custom/hunt-card"
import { CreateHuntModal, type NewHunt } from "@/components/custom/create-hunt-modal"
import { useSession } from "@/contexts/auth-context"
import { QueryHandler } from "@/handlers/query-handler"
import { hunts } from "@/services/hunts"
import { useQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import { Plus, Search, Filter } from "lucide-react"
import "../styles/leaflet-overrides.css"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function Hunts() {
  const { token } = useSession()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [customHunts, setCustomHunts] = useState<any[]>([])
  const [isClient, setIsClient] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilters, setStatusFilters] = useState({
    live: true,
    upcoming: true,
    past: true
  })

  // Use this to ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  const { isPending, error, data } = useQuery({
    queryKey: ["hunts"],
    queryFn: async () => {
      return await hunts(token)
    }
  })

  const handleCreateHunt = (newHunt: NewHunt) => {
    // Create a mock hunt like object to match the existing data structure
    const mockHuntLike = {
      huntDto: {
        id: newHunt.id,
        name: newHunt.name,
        description: newHunt.description,
        latitude: newHunt.latitude,
        longitude: newHunt.longitude,
        startTime: newHunt.startTime,
        endTime: newHunt.endTime,
        owner: null,
        likes: []
      },
      likedBy: false,
      likeCount: 0
    }

    // Add new hunt to the beginning of the array
    setCustomHunts((prev) => [mockHuntLike, ...prev])
  }

  // Filter hunts based on search query and status filters
  const filteredHunts = [...customHunts, ...(data || [])].filter((hunt) => {
    const currentTime = new Date().toISOString()
    const isLive = currentTime >= hunt.huntDto.startTime && currentTime <= hunt.huntDto.endTime
    const isUpcoming = currentTime < hunt.huntDto.startTime
    const isPast = currentTime > hunt.huntDto.endTime

    // Check if hunt matches the search query
    const matchesSearch =
      hunt.huntDto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (hunt.huntDto.description &&
        hunt.huntDto.description.toLowerCase().includes(searchQuery.toLowerCase()))

    // Check if hunt matches the status filters
    const matchesStatus =
      (isLive && statusFilters.live) ||
      (isUpcoming && statusFilters.upcoming) ||
      (isPast && statusFilters.past)

    return matchesSearch && matchesStatus
  })

  // Count hunts by status
  const huntCounts = {
    total: filteredHunts.length,
    live: filteredHunts.filter((hunt) => {
      const currentTime = new Date().toISOString()
      return currentTime >= hunt.huntDto.startTime && currentTime <= hunt.huntDto.endTime
    }).length,
    upcoming: filteredHunts.filter((hunt) => {
      const currentTime = new Date().toISOString()
      return currentTime < hunt.huntDto.startTime
    }).length,
    past: filteredHunts.filter((hunt) => {
      const currentTime = new Date().toISOString()
      return currentTime > hunt.huntDto.endTime
    }).length
  }

  // Only render the full component on the client side
  if (!isClient) {
    return (
      <div className="mt-8 flex items-center justify-between px-8">
        <p className="text-white">Loading hunts...</p>
      </div>
    )
  }

  return (
    <>
      <div className="mt-8 flex flex-col gap-4 px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button
            variant="navigation"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            Create Hunt
          </Button>

          <div className="mx-4 flex max-w-md flex-1">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <Input
                placeholder="Search hunts by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-white bg-deep pl-10 text-white"
              />
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-white bg-deep text-white">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-white bg-royal text-white">
              <DropdownMenuCheckboxItem
                checked={statusFilters.live}
                onCheckedChange={(checked) =>
                  setStatusFilters((prev) => ({ ...prev, live: checked }))
                }
              >
                Live Hunts
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilters.upcoming}
                onCheckedChange={(checked) =>
                  setStatusFilters((prev) => ({ ...prev, upcoming: checked }))
                }
              >
                Upcoming Hunts
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilters.past}
                onCheckedChange={(checked) =>
                  setStatusFilters((prev) => ({ ...prev, past: checked }))
                }
              >
                Past Hunts
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="outline" className="border-white bg-deep text-white">
            Total: {huntCounts.total}
          </Badge>
          {statusFilters.live && (
            <Badge variant="outline" className="border-green-500 bg-green-900/30 text-green-400">
              Live: {huntCounts.live}
            </Badge>
          )}
          {statusFilters.upcoming && (
            <Badge variant="outline" className="border-blue-500 bg-blue-900/30 text-blue-400">
              Upcoming: {huntCounts.upcoming}
            </Badge>
          )}
          {statusFilters.past && (
            <Badge variant="outline" className="border-gray-500 bg-gray-900/30 text-gray-400">
              Past: {huntCounts.past}
            </Badge>
          )}
        </div>
      </div>

      <QueryHandler isPending={isPending} error={error}>
        {filteredHunts.length > 0 ? (
          <div className="mt-8 flex flex-wrap justify-center gap-5 pb-20">
            {filteredHunts.map((hunt) => (
              <HuntCard hunt={hunt} key={hunt.huntDto.id} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex justify-center">
            <p className="text-lg text-white">No hunts found matching your filters.</p>
          </div>
        )}
      </QueryHandler>

      <CreateHuntModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateHunt={handleCreateHunt}
      />
    </>
  )
}
