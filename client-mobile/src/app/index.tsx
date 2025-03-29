import { useSession } from "@/contexts/auth-context";
import { Controller, useForm } from "react-hook-form";
import { Button, SafeAreaView, StyleSheet, TextInput } from "react-native";

export default function Index() {
  const { signIn } = useSession();
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);

    signIn(data.email, data.password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Controller
        name="email"
        defaultValue=""
        control={control}
        render={({ field }) => {
          return (
            <TextInput
              placeholder="Email"
              value={field.value}
              style={styles.input}
              onChangeText={field.onChange}
            />
          );
        }}
      />
      <Controller
        name="password"
        defaultValue=""
        control={control}
        render={({ field }) => {
          return (
            <TextInput
              placeholder="Password"
              value={field.value}
              style={styles.input}
              onChangeText={field.onChange}
            />
          );
        }}
      />
      <Button title="submit" onPress={handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
}

type FormData = {
  email: string;
  password: string;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    backgroundColor: "#000",
    color: "#fff",
    padding: 8,
  },
});
