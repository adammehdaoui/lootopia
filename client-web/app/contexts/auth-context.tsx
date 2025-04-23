import { createContext, useContext, useMemo } from "react"

const AuthContext = createContext<AuthContextArgs>({
  connected: false,
  username: null,
  id: null,
  token: null
})

export function useSession() {
  const value = useContext(AuthContext)

  if (process.env.NODE_ENV !== "production" && !value) {
    throw new Error("useSession must be used within an AuthProvider")
  }

  return value
}

export function AuthProvider(props: AuthProviderProps) {
  const { children, connected, username, id, token } = props

  const contextValue = useMemo(
    () => ({
      connected,
      username,
      id,
      token
    }),
    [connected, username, id, token]
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

type AuthContextArgs = {
  connected: boolean
  username: string | null
  id: string | null
  token: string | null
}

type AuthProviderProps = {
  children: React.ReactNode
} & AuthContextArgs
