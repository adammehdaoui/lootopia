import { ARScene } from "@/components/ar-scene";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";

export default function ChestAR() {
  const [isARActive, setIsARActive] = useState(false);

  const handleActivateAR = () => {
    setIsARActive(true);
  };

  const handleDeactivateAR = () => {
    console.log("Tentative de désactivation de la scène AR...");
    try {
      setIsARActive(false);
    } catch (error) {
      console.error("Erreur lors de la désactivation de la scène AR :", error);
    }
    console.log("Scène AR désactivée.");
  };

  return (
    <View style={styles.container}>
      {isARActive ? (
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{ scene: ARScene }}
          style={styles.f1}
        />
      ) : (
        <View style={styles.placeholder}>
          <Button title="Activer AR" onPress={handleActivateAR} />
        </View>
      )}
      {isARActive && (
        <View style={styles.deactivateButton}>
          <Button title="Désactiver AR" onPress={handleDeactivateAR} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  f1: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deactivateButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
});
