import { logout } from "@/services/auth/auth"
import { ActionFunction } from "@remix-run/node"

export const action: ActionFunction = async () => {
  return logout()
}
