import { SessionProvider } from "@/contexts/auth-context";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toaster } from "sonner-native";

export default function Layout() {
  const [loaded, error] = useFonts({
    Montserrat: require("../../assets/fonts/Montserrat-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <SessionProvider>
          <Stack screenOptions={{ headerShown: false }} />
          <Toaster />
        </SessionProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
