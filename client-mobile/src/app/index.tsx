import { useSession } from "@/contexts/auth-context";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

type FormData = {
  email: string;
  password: string;
};

export default function Index() {
  const { signIn } = useSession();
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    signIn(data.email, data.password);
  };

  return (
    <SafeAreaView style={styles.container}>
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
              placeholderTextColor="#aaa"
              onChangeText={field.onChange}
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
              placeholderTextColor="#aaa"
              secureTextEntry
              onChangeText={field.onChange}
            />
          )}
        />
        <Button title="Submit" onPress={handleSubmit(onSubmit)} color="#fff" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
  formContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#333",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 50,
    backgroundColor: "#444",
    color: "#fff",
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
});
