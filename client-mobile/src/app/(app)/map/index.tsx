import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";

export default function HuntsMap() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});

      console.log("Current location:", currentLocation);

      setLocation(currentLocation);
    }

    getCurrentLocation();
  }, []);

  if (location === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Map is loading...</Text>
      </View>
    );
  }

  const blueZones = [
    { latitude: 48.8566, longitude: 2.3522, radius: 1000 },
    { latitude: 48.9022, longitude: 2.4699, radius: 800 },
    { latitude: 48.8372, longitude: 2.3751, radius: 600 },
    { latitude: 48.847, longitude: 2.254, radius: 900 },
    { latitude: 48.795, longitude: 2.3823, radius: 700 },
    {
      latitude: 48.84951412640996,
      longitude: 2.5084768341560357,
      radius: 1000,
    },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="You are here"
          pinColor="#FFFFFF"
        />
        {blueZones.map((zone, index) => (
          <Circle
            key={index}
            center={{ latitude: zone.latitude, longitude: zone.longitude }}
            radius={zone.radius}
            fillColor="rgba(47, 47, 255, 0.1)"
            strokeColor="rgba(69, 69, 248, 0.8)"
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  map: { width: "100%", height: "100%" },
});
