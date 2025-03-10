import NavItem from "@/app/(components)/nav-item";
import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Layout() {
  return (
    <View style={styles.container}>
      <Slot />
      <View style={styles.navbar}>
        <NavItem href="/" icon="home-outline" label="Home" />
        <NavItem href="/chest" icon="cube-outline" label="Chest" />
        <NavItem href="/map" icon="map-outline" label="Map" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#222",
    paddingVertical: 10,
    paddingBottom: 40,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
