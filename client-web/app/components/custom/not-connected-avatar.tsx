import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function NotConnectedAvatar() {
  return (
    <Avatar className="cursor-pointer">
      <AvatarImage src="/assets/fallback.png" />
      <AvatarFallback>LOO</AvatarFallback>
    </Avatar>
  )
}
