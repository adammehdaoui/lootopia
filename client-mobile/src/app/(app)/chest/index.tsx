import { ARScene } from "@/components/ar-scene";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import React from "react";
import { StyleSheet } from "react-native";
import { OptimizedHeavyScreen } from "react-navigation-heavy-screen";

export default function ChestAR() {
  return (
    <OptimizedHeavyScreen>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: ARScene }}
        style={styles.f1}
      />
    </OptimizedHeavyScreen>
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
