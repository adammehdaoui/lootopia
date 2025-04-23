import ConnectedAvatar from "@/components/custom/connected-avatar"
import NotConnectedAvatar from "@/components/custom/not-connected-avatar"
import { useSession } from "@/contexts/auth-context"

export default function AvatarHandler() {
  const { connected } = useSession()

  return (
    <div className="flex justify-end">
      {connected ? <ConnectedAvatar /> : <NotConnectedAvatar />}
    </div>
  )
}
