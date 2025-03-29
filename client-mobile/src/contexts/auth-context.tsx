import { useStorageState } from "@/hooks/use-storage-state";
import { handleSignIn } from "@/services/handle-sign-in";
import { createContext, useContext } from "react";

const AuthContext = createContext<AuthContextArgs>({
  signIn: () => {},
  signOut: () => {},
  session: null,
  loading: true,
});

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

  const signIn = async (email: string, password: string) => {
    const response = await handleSignIn(email, password);

    console.log("response", response);

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

type AuthContextArgs = {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  loading: boolean;
};
