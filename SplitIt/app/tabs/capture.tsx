import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRef, useState, useEffect } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const BASE_URL = 'http://192.168.1.144:3000';

// Send receipt to backend
async function sendImageToBackend(imageURI: string): Promise<string> {
  try {
    // Check if the image exists
    const imageFileInfo = await FileSystem.getInfoAsync(imageURI);
    if (!imageFileInfo.exists) {
      throw new Error("This file does not exist on this device");
    }
    
    const formData = new FormData();
    formData.append('image', {
      imageURI,
      name: 'photo.jpg',
      type: 'image/jpeg',
    } as any);

    await axios.post(`${BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Post the image to the backend
    const response = await axios.post(`${BASE_URL}/upload`, imageFileInfo, {
      headers: {
        'Content-Type': 'multipart/form-data' 
      }
    });

    // Return the data
    console.log(response.data);
    return response.data;

    // Handle potential errors
  } catch (error) {
    console.log(error);
    return "Error contacting backend";
  } finally {
    console.log("This is the finally statement");
  }
}

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  
  useEffect(() => {
    if (uri) {
      // console.log(uri);
    }
  }, [uri]);
  
  useEffect(() => {
    if (message) {
      // console.log(message)
    }
  })

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to use the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (photo?.uri) {
      setUri(photo.uri);
      const response = await sendImageToBackend(photo.uri);
      setMessage(response);
    }
  };

  const renderCamera = () => {
    return (
      <CameraView
        style={styles.camera}
        ref={ref}
        mode={"picture"}
        facing={"back"}
        mute={false}
        responsiveOrientationWhenOrientationLocked
      >
        <View style={styles.shutterContainer}>
          <Pressable onPress={takePicture}>
            {({ pressed }) => (
              <View
                style={[
                  styles.shutterBtn,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
              </View>
            )}
          </Pressable>
        </View>
      </CameraView>
    );
  };

  return (
    <View style={styles.container}>
      {renderCamera()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 160,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
});