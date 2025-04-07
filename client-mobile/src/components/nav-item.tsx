import { Ionicons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function NavItem({ href, icon, label }: NavItemProps) {
  return (
    <Link href={href} asChild>
      <Pressable style={styles.navItem}>
        <Ionicons name={icon} size={24} color="white" />
        <Text style={styles.navText}>{label}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  navItem: {
    alignItems: "center",
  },
  navText: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  },
});

type NavItemProps = {
  href: Href;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
};
