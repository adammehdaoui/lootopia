import { useSession } from "@/contexts/auth-context";
import { Image } from "expo-image";
import { Controller, useForm } from "react-hook-form";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { signIn } = useSession();
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    signIn(data.email, data.password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.presentation}>
        <Image
          source={require("../../assets/images/icon.png")}
          cachePolicy="memory"
          style={styles.image}
        />
        <Text style={styles.title}>Lootopia</Text>
      </View>
      <View style={styles.formContainer}>
        <Controller
          name="email"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextInput
              placeholder="Email"
              value={field.value}
              style={styles.input}
              onChangeText={field.onChange}
              placeholderTextColor="#FFF"
            />
          )}
        />
        <Controller
          name="password"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextInput
              placeholder="Password"
              value={field.value}
              style={styles.input}
              secureTextEntry
              onChangeText={field.onChange}
              placeholderTextColor="#FFF"
            />
          )}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
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
  presentation: {
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 50,
  },
  title: {
    color: "#FFFFFF",
    fontFamily: "BioRhyme",
    fontSize: 30,
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 20,
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
  },
  input: {
    height: 50,
    backgroundColor: "#101D3B",
    color: "#FFF",
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontFamily: "Montserrat",
  },
  button: {
    borderWidth: 1,
    borderColor: "#FFF",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Montserrat",
  },
});
