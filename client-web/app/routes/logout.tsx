import { logout } from "@/services/auth/auth"
import { type ActionFunction } from "@remix-run/node"

export const action: ActionFunction = async () => {
  return logout()
}
