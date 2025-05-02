"use client"

import { Button } from "@/components/ui/button"
import { HuntCard } from "@/components/custom/hunt-card"
import { CreateHuntModal, type NewHunt } from "@/components/custom/create-hunt-modal"
import { useSession } from "@/contexts/auth-context"
import { QueryHandler } from "@/handlers/query-handler"
import { hunts } from "@/services/hunts"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Plus } from "lucide-react"

export default function Hunts() {
  const { token } = useSession()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [customHunts, setCustomHunts] = useState<any[]>([])

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

    setCustomHunts((prev) => [...prev, mockHuntLike])
  }

  return (
    <>
      <div className="mt-8 flex items-center justify-between px-8">
        <Button
          variant="navigation"
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus size={18} />
          Create Hunt
        </Button>
      </div>

      <QueryHandler isPending={isPending} error={error}>
        <div className="mt-8 flex flex-wrap justify-center gap-5 pb-20">
          {customHunts.map((hunt) => (
            <HuntCard hunt={hunt} key={hunt.huntDto.id} />
          ))}
          {data?.map((hunt) => <HuntCard hunt={hunt} key={hunt.huntDto.id} />)}
        </div>
      </QueryHandler>

      <CreateHuntModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateHunt={handleCreateHunt}
      />
    </>
  )
}
