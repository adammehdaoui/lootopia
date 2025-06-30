import { ARScene } from "@/components/ar-scene";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import React from "react";
import { StyleSheet } from "react-native";

export default function ChestAR() {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{ scene: ARScene }}
      style={styles.f1}
    />
  );
}

const styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
