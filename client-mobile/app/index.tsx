import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.mainView}>
      <Pressable>
        <Link href="/chest" style={styles.link} asChild>
          <Text>Home</Text>
        </Link>
      </Pressable>
    </View>
  );
}

var styles = StyleSheet.create({
  mainView: { flex: 1 },
  link: {
    fontFamily: "Arial",
    fontSize: 30,
    textAlign: "center",
    marginTop: 150,
  },
});