import { Live } from "@/components/custom/live"
import { useSession } from "@/contexts/auth-context"
import { ErrorHandler } from "@/handlers/error-handler"
import { useToast } from "@/hooks/use-toast"
import type { HuntLike } from "@/model/hunt"
import { like as likeFunction, unlike as unlikeFunction } from "@/services/hunts"
import { useMutation } from "@tanstack/react-query"
import { Heart } from "lucide-react"
import { useState } from "react"

export function HuntCard(props: HuntCardProps) {
  const { toast } = useToast()
  const { token } = useSession()
  const { hunt } = props
  const [like, setLike] = useState(hunt.likedBy)
  const [likeCount, setLikeCount] = useState(hunt.likeCount)
  const currentTime = new Date().toISOString()

  const likeMutation = useMutation({
    mutationFn: async ({ huntId, currentToken }: LikeMutationArgs) => {
      if (like) {
        return await likeFunction(huntId, currentToken)
      }

      return await unlikeFunction(huntId, currentToken)
    },
    onError: (error: Error) => {
      console.error("Error liking/unliking the hunt")
      console.error(error)

      toast({
        title: "Error",
        description: "Error liking/unliking the hunt, please try again later",
        variant: "destructive"
      })
    }
  })

  if (token === null) {
    const error = new Error("Token is required to fetch hunts")

    return <ErrorHandler error={error} />
  }

  const live = currentTime < hunt.huntDto.endTime && currentTime > hunt.huntDto.startTime

  const handleLike = (huntId: string, token: string) => {
    setLike((like) => !like)

    const likeArgs = {
      huntId,
      currentToken: token
    }

    likeMutation.mutate(likeArgs)

    if (like) {
      setLikeCount((likeCount) => likeCount - 1)
      return
    }

    setLikeCount((likeCount) => likeCount + 1)
  }

  return (
    <div className="flex h-card w-card cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:scale-105">
      <img
        src="https://i.imgur.com/qUDZvR4.jpeg"
        alt="location"
        width={600}
        height={400}
        className="h-64 w-full object-cover"
      />
      <div className="mt-5 flex flex-1 flex-col justify-between p-5">
        <div className="flex flex-col space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button onClick={() => handleLike(hunt.huntDto.id, token)}>
                {like ? (
                  <Heart
                    size={25}
                    fill="red"
                    strokeWidth={0}
                    className="cursor-pointer border-none duration-500 hover:scale-125"
                  />
                ) : (
                  <Heart
                    size={25}
                    className="cursor-pointer border-none duration-500 hover:scale-125"
                  />
                )}
              </button>
              <span>{likeCount} likes</span>
            </div>
            <span className="items flex-center">{live && <Live />}</span>
          </div>
          <div className="flex justify-center space-x-5">
            <h3 className="font-biorhyme text-xl font-semibold">{hunt.huntDto.name}</h3>
          </div>
          <span>{hunt.huntDto.description}</span>
        </div>
      </div>
    </div>
  )
}

type HuntCardProps = {
  hunt: HuntLike
}

type LikeMutationArgs = {
  huntId: string
  currentToken: string
}
