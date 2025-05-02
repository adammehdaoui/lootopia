import { useStorageState } from "@/hooks/use-storage-state";
import { handleSignIn } from "@/services/handle-sign-in";
import { useRouter } from "expo-router";
import { createContext, useContext } from "react";
import { toast } from "sonner-native";

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

export function SessionProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [[loading, session], setSession] = useStorageState("session");
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    const response = await handleSignIn(email, password);

    if (response.token) {
      setSession(response.token);

      return router.navigate("/home");
    }

    toast.error("Invalid email or password");
  };

  const signOut = () => {
    setSession(null);

    return router.replace("/");
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
