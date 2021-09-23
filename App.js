import { StatusBar } from 'expo-status-bar';
import React, { useEffect }from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Camera} from 'expo-camera'
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [startCamera,setStartCamera] = React.useState(false)
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.front)
  let camera = Camera;

  const __takePicture = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync()
    console.log('photo', photo);
    await MediaLibrary.saveToLibraryAsync(photo.uri);
   
  }

  const __startCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync()
    if (status === 'granted') {
      // start the camera
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }

  return (
    <View style={styles.container}>
        { startCamera && 
            <Camera
            type={cameraType}
            style={{width:"100%", height: 700}}
            ref={(r) => {
            camera = r
            }}
            ></Camera>
        }

        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Open Camera
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=> setCameraType(cameraType == "front" ? "back": "front")}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Switch Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={__takePicture}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Take Picture
            </Text>
          </TouchableOpacity>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
