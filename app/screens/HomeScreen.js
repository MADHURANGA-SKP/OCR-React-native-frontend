import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Tesseract from "tesseract.js";
import BackButton from "../../components/BackButton";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Button from "../../components/Button";

export default function HomeScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  
  // Function to request permissions
  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
    }
  };

  // Function to open the camera and capture an image
  const captureImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
      extractText(result.uri);
    }
  };

  // Function to pick an image from the gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
      extractText(result.uri);
    }
  };

  // Function to extract text from the image
  const extractText = async (imageUri) => {
    try {
      const result = await Tesseract.recognize(imageUri, "eng");
      setExtractedText(result.data.text);
    } catch (error) {
      console.error("Error extracting text: ", error);
    }
  };
  console.log("Navigation prop:", navigation);
  return (
    <Background>
      
     <View style={styles.topButtonsContainer}>
        <Button mode="contained"
         onPress={() => navigation.navigate("SettingsScreen")}
        >
          <Text style={styles.topButtonText}>Menu</Text>
        </Button>
        <Button mode="contained"
          onPress={() => navigation.navigate("userScreen")}
        >
          <Text style={styles.topButtonText}>User</Text>
        </Button>
      </View>
      <Logo />
      <Header>Welcome 💫</Header>
    
      <Button mode="contained" onPress={captureImage}>
        Capture Image
      </Button>
      <Button mode="contained" onPress={pickImage} style={{ marginTop: 10 }}>
        Pick Image from Gallery
      </Button>

      {image && <Image source={{ uri: image }} style={styles.image} />}
      {extractedText ? (
        <View style={styles.textContainer}>
          <Text style={styles.textLabel}>Extracted Text:</Text>
          <Text style={styles.extractedText}>{extractedText}</Text>
        </View>
      ) : (
        <Text style={styles.instructions}>
          Upload or capture an image to extract text.
        </Text>
      )}

      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "StartScreen" }],
          })
        }
        style={{ marginTop: 100 }}
      >
        Sign out
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  topButtonsContainer: {
    flexDirection: "row", // Arrange buttons in a row
    justifyContent: "center", // Space them apart
    alignItems: "center",
    gap: "10px",
    position: "absolute", // Make it absolute to place it at the top
    top: 0, // Align at the top of the page
    width: "50%", // Ensure it spans the entire width
    padding: 20, // Add padding around the container
    backgroundColor: "#f8f8f8", // Optional: Add a background color for clarity
    zIndex: 10, // Ensure it's above other elements
  },
  topButton: {
    padding: 10,
    backgroundColor: "#6200EE",
    borderRadius: 5,
    marginHorizontal: 10, // Add gap between buttons
  },
  topButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  textLabel: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  extractedText: {
    fontSize: 14,
    color: "#333",
  },
  instructions: {
    marginTop: 20,
    fontSize: 14,
    color: "#888",
  },
});