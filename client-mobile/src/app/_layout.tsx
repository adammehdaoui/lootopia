import { SessionProvider } from "@/contexts/auth-context";
import { Slot } from "expo-router";

export default function Layout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
