import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function Index() {
  return (
    <View>
      <Pressable>
        <Link href="/chest" asChild>
          <Text>Home</Text>
        </Link>
      </Pressable>
    </View>
  );
}
