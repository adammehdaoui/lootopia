import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARScene,
  ViroARSceneNavigator,
  ViroTrackingReason,
} from "@reactvision/react-viro";
import React from "react";
import { StyleSheet } from "react-native";

export function AR() {
  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("onInitialized", state, reason);
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color="#FFFFFF" />
      <Viro3DObject
        source={require("../../../../assets/3d/chest/chest.obj")}
        resources={[require("../../../../assets/3d/chest/chest.mtl")]}
        type="OBJ"
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
      />
    </ViroARScene>
  );
}

export default function ChestAR() {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: AR,
      }}
      style={styles.f1}
    />
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
