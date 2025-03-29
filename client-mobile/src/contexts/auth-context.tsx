import { useStorageState } from "@/hooks/use-storage-state";
import { createContext, useContext } from "react";

const AuthContext = createContext<AuthContextArgs>({
  signIn: () => {},
  signOut: () => {},
  session: null,
  loading: true,
});

type AuthContextArgs = {
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  loading: boolean;
};

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [[loading, session], setSession] = useStorageState("session");

  const signIn = () => {
    setSession("session");
  };

  const signOut = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
