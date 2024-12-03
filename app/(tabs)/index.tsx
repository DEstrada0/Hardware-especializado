import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen: React.FC = () => {
  const [region, setRegion] = useState<any>(null);
  const [markers, setMarkers] = useState<Array<{ id: string, title: string, coordinate: { latitude: number, longitude: number } }>>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });


      setMarkers([
        {
          id: '1',
          title: 'Place 1',
          coordinate: {
            latitude: location.coords.latitude + 0.002,
            longitude: location.coords.longitude + 0.002,
          },
        },
        {
          id: '2',
          title: 'Place 2',
          coordinate: {
            latitude: location.coords.latitude - 0.002,
            longitude: location.coords.longitude - 0.002,
          },
        },
      ]);
    })();
  }, []);

  if (!region) return null;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
