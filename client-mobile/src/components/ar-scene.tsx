import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARScene,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import { useState } from "react";

export function ARScene() {
  const onInitialized = (
    state: ViroTrackingStateConstants,
    reason: ViroTrackingReason
  ) => {
    console.log("onInitialized", state.toLocaleString(), reason);
  };

  const [clicked, setClicked] = useState(false);

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color="#FFFFFF" />
      <Viro3DObject
        source={require("../../assets/3d/chest/chest.obj")}
        resources={[require("../../assets/3d/chest/chest.mtl")]}
        type="OBJ"
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -5]}
        onClickState={() => {
          console.log("Object clicked");
          setClicked(true);
        }}
        onDrag={() => {
          console.log("Object dragged");
        }}
        opacity={clicked ? 0 : 1}
      />
      <ViroText
        text="You have claimed your loot!"
        position={[5, 0, -5]}
        width={10}
        height={2}
        style={{
          fontFamily: "Arial",
          fontSize: 30,
          fontWeight: "800",
          fontStyle: "normal",
          color: "#FFFFFF",
        }}
        opacity={clicked ? 1 : 0}
      />
    </ViroARScene>
  );
}
