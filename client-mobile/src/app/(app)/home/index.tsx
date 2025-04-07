import { useSession } from "@/contexts/auth-context";
import { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { toast } from "sonner-native";

export default function Home() {
  const { signOut, loading } = useSession();

  useEffect(() => {
    toast.success("Welcome to Lootopia! You're successfully logged in.");
  }, []);

  const handleSignout = (): void => {
    signOut();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleSignout}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.presentation}>
        <Image
          source={require("../../../../assets/images/icon.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Welcome to Lootopia</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.buttonText}>
          This is your dashboard. More coming soon 👀
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#101D3B",
  },
  logout: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    color: "#FFFFFF",
  },
  presentation: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  title: {
    color: "#FFFFFF",
    fontFamily: "BioRhyme",
    fontSize: 30,
    marginTop: 20,
  },
  subtitle: {
    color: "#BBB",
    fontFamily: "Montserrat",
    fontSize: 16,
    marginTop: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  formContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#142247",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 60,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Montserrat",
    textAlign: "center",
  },
});
