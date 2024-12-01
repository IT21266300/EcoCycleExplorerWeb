import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, Circle } from 'react-native-maps';
import { calculateDistance } from '../../utils/locationUtils';

interface Location {
  latitude: number;
  longitude: number;
  timestamp: Date;
}

interface DangerZone {
  id: number;
  latitude: number;
  longitude: number;
  radius: number;
  description: string;
}

const dangerZones: DangerZone[] = [
  { id: 1, latitude: 6.9271, longitude: 79.8612, radius: 100, description: 'Sharp bend ahead' },
  { id: 2, latitude: 6.9275, longitude: 79.8615, radius: 100, description: 'Steep descent' },
];

const DANGER_ZONE_RADIUS = 200;
const ALERT_THRESHOLD = 500;

const RideTracking = () => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [trackData, setTrackData] = useState<Location[]>([]);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        startTracking();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const startTracking = () => {
    setIsTracking(true);
    Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation: Location = {
          latitude,
          longitude,
          timestamp: new Date()
        };
        
        setCurrentLocation(newLocation);
        setTrackData(prev => [...prev, newLocation]);
        checkDangerZones(newLocation);
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 1000,
        fastestInterval: 500
      }
    );
  };

  const checkDangerZones = (location: Location) => {
    dangerZones.forEach(zone => {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        zone.latitude,
        zone.longitude
      );

      if (distance <= ALERT_THRESHOLD && distance > zone.radius) {
        Alert.alert('Warning', `${zone.description} in ${Math.round(distance)}m`);
      }
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: currentLocation?.latitude || 6.9271,
          longitude: currentLocation?.longitude || 79.8612,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Current Location"
          />
        )}
        
        {dangerZones.map(zone => (
          <Circle
            key={zone.id}
            center={{
              latitude: zone.latitude,
              longitude: zone.longitude,
            }}
            radius={zone.radius}
            fillColor="rgba(255, 0, 0, 0.2)"
            strokeColor="rgba(255, 0, 0, 0.5)"
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
  }
});

export default RideTracking;
