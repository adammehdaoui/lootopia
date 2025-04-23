import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "@/contexts/auth-context"
import { getAvatar } from "@/services/avatar"
import { useQuery } from "@tanstack/react-query"

export default function ConnectedAvatar() {
  const { username, token } = useSession()

  const { isPending, error, data } = useQuery({
    queryKey: ["avatar"],
    queryFn: async () => {
      return await getAvatar(token)
    }
  })

  if (error) {
    console.error(error)
  }

  if (isPending || error || !data) {
    return (
      <Avatar className="cursor-pointer">
        <AvatarImage src="/assets/fallback.png" />
        <AvatarFallback>{username?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
    )
  }

  const avatarUrl = data

  return (
    <Avatar className="cursor-pointer">
      <AvatarImage src={avatarUrl} />
      <AvatarFallback>{username?.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}
