import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

export default function SettingsScreen() {
  const [isDataCollectionEnabled, setDataCollectionEnabled] = useState(true);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);

  useEffect(() => {
    async function checkPermissions() {
      const { status: cameraStatus } = await ImagePicker.getCameraPermissionsAsync();
      const { status: locationStatus } = await Location.getForegroundPermissionsAsync();
      setCameraPermission(cameraStatus === 'granted');
      setLocationPermission(locationStatus === 'granted');
    }

    checkPermissions();
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    setCameraPermission(status === 'granted');
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to grant camera permissions to use this feature.');
    }
  };

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setLocationPermission(status === 'granted');
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to grant location permissions to use this feature.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Text style={styles.privacyText}>
        We value your privacy and only collect data to enhance your experience. You can control what data we collect below.
      </Text>

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>Data Collection:</Text>
        <Switch
          value={isDataCollectionEnabled}
          onValueChange={(value) => setDataCollectionEnabled(value)}
          trackColor={{ false: "#e0e0e0", true: "#81b0ff" }}
          thumbColor={isDataCollectionEnabled ? "#2a9d8f" : "#f4f3f4"}
        />
      </View>

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>Camera Permission:</Text>
        <Switch
          value={cameraPermission}
          onValueChange={(value) => {
            if (value) {
              requestCameraPermission();
            } else {
              setCameraPermission(false);
            }
          }}
          trackColor={{ false: "#e0e0e0", true: "#81b0ff" }}
          thumbColor={cameraPermission ? "#2a9d8f" : "#f4f3f4"}
        />
      </View>

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>Location Permission:</Text>
        <Switch
          value={locationPermission}
          onValueChange={(value) => {
            if (value) {
              requestLocationPermission();
            } else {
              setLocationPermission(false);
            }
          }}
          trackColor={{ false: "#e0e0e0", true: "#81b0ff" }}
          thumbColor={locationPermission ? "#2a9d8f" : "#f4f3f4"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f8fa',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 25,
    color: '#2a2a2a',
  },
  privacyText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  toggleText: {
    fontSize: 18,
    color: '#555',
  },
});
