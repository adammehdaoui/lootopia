import { ARScene } from "@/components/ar-scene";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

export default function ChestAR() {
  const [showAR, setShowAR] = useState(true);

  useFocusEffect(() => {
    return () => {
      setShowAR(false);
    };
  });

  return (
    showAR && (
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: ARScene }}
        style={styles.f1}
      />
    )
  );
}

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
