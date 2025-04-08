import { createContext, useContext } from "react"

const AuthContext = createContext<AuthContextArgs>({
  connected: false,
  username: null
})

export function useSession() {
  const value = useContext(AuthContext)

  if (process.env.NODE_ENV !== "production" && !value) {
    throw new Error("useSession must be used within an AuthProvider")
  }

  return value
}

export function AuthProvider(props: AuthProviderProps) {
  const { children, connected, username } = props

  return <AuthContext.Provider value={{ connected, username }}>{children}</AuthContext.Provider>
}

type AuthContextArgs = {
  connected: boolean
  username: string | null
}

type AuthProviderProps = {
  children: React.ReactNode
} & AuthContextArgs
