import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARScene,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";

export function ARScene() {
  const onInitialized = (
    state: ViroTrackingStateConstants,
    reason: ViroTrackingReason
  ) => {
    console.log("onInitialized", state.toLocaleString(), reason);
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color="#FFFFFF" />
      <Viro3DObject
        source={require("../../assets/3d/chest/chest.obj")}
        resources={[require("../../assets/3d/chest/chest.mtl")]}
        type="OBJ"
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
      />
    </ViroARScene>
  );
}
