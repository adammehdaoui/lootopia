import { createContext, useContext, useMemo } from "react"

const AuthContext = createContext<AuthContextArgs>({
  connected: false,
  username: null,
  id: null,
  token: null,
  stripe_public_key: null
})

export function useSession() {
  const value = useContext(AuthContext)

  if (process.env.NODE_ENV !== "production" && !value) {
    throw new Error("useSession must be used within an AuthProvider")
  }

  return value
}

export function AuthProvider(props: AuthProviderProps) {
  const { children, connected, username, id, token, stripe_public_key } = props

  const contextValue = useMemo(
    () => ({
      connected,
      username,
      id,
      token,
      stripe_public_key
    }),
    [connected, username, id, token, stripe_public_key]
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

type AuthContextArgs = {
  connected: boolean
  username: string | null
  id: string | null
  token: string | null
  stripe_public_key: string | null
}

type AuthProviderProps = {
  children: React.ReactNode
} & AuthContextArgs
