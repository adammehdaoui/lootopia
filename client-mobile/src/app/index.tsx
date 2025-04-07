import { useSession } from "@/contexts/auth-context";
import { ErrorMessage } from "@hookform/error-message";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
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
  const { session, loading, signIn } = useSession();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();
  const router = useRouter();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (session) {
    router.replace("/home");
  }

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
          rules={{
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email is invalid",
            },
          }}
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
        {errors.email && (
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <Text style={styles.error}>{message}</Text>
            )}
          />
        )}

        <Controller
          name="password"
          defaultValue=""
          control={control}
          rules={{
            required: true,
          }}
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
        {errors.password && (
          <ErrorMessage
            errors={errors}
            name="password"
            render={() => (
              <Text style={styles.error}>Password is required</Text>
            )}
          />
        )}

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
    marginBottom: 60,
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
  error: {
    color: "red",
    marginBottom: 10,
  },
});
