import { logout } from "@/services/auth.server"
import { ActionFunction } from "@remix-run/node"

export const action: ActionFunction = async () => {
  return logout()
}
