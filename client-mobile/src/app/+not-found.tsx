import { StyleSheet, Text, View } from "react-native";

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This screen doesn't exist.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    color: "#000",
  },
});
