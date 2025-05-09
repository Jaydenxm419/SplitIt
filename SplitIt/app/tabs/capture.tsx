import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

// TODO: Create IP for backend
const BASE_URL = 'http://192.168.1.144:3000';

// POST receipt to backend
async function postReceiptImage(imageURI: string): Promise<string> {
  try {
    // Check if the image exists
    const imageFileInfo = await FileSystem.getInfoAsync(imageURI);
    if (!imageFileInfo.exists) {
      throw new Error("This file does not exist on this device");
    }
    
    // Organize form data to POST
    const formData = new FormData();
    formData.append('image', {
      uri: imageURI,
      name: 'photo.jpg', // TODO: Dynamically change photo name by default or ask for user input
      type: 'image/jpeg',
    } as any);

    // POST the image to backend
    const response = await axios.post(`${BASE_URL}/receipts/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Return the data
    console.log("Retrieving image...", response.data.filename);
    return response.data.filename;

    // Handle errors
  } catch (error) {
    return "Error contacting backend";
  } finally {
    console.log("This is the finally statement");
  }
}

// Capture receipt image
export default function CaptureReceipt() {
  const [permission, requestPermission] = useCameraPermissions();
  const [filename, setFileName] = useState<string | null>(null);
  const ref = useRef<CameraView>(null);

  // Client declines permission
  if (!permission) {
    return null;
  }

  // Grant permission popup
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

  // Camera takes picture
  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync(); // capture image metadata
    if (photo?.uri) {
      const response = await postReceiptImage(photo.uri); // send the image backend
      setTimeout(() => setFileName(response), 300); 
    }
  };

  // Open camera view
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
      {filename && (
      <Image
      source={{ uri: `${BASE_URL}/receipts/${filename}?t=${Date.now()}` }}
      style={styles.imagePreview}/>
    )}
    </View>
  );
}

// Style
const styles = StyleSheet.create({
  // Camera container
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  // Camera zoom
  camera: {
    flex: 1,
    width: "100%",
  },
  // Shutter container
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 160,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // Shutter button
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
  // Image preview after picture
  imagePreview: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderRadius: 8,
  }
});