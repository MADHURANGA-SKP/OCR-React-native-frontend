import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView  } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import BackButton from "../../components/BackButton";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { useUser } from "../helpers/UserContext";

export default function HomeScreen({ navigation }) {
  const { user } = useUser();
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");

  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
    }
  };

  const captureImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };


  const sendImageToServer = async () => {
    if (!user || !image) {
      console.error("User not logged in or no image selected.");
      alert("Please log in or select an image before submitting.");
      return;
    }

    const formData = new FormData();
      formData.append("user_id", user.user_id); 

      const uriParts = image.split('.');
      const fileType = uriParts[uriParts.length - 1];

      try {
        const response = await fetch(image);
        const blob = await response.blob();

        const file = new File([blob], `image.${fileType}`, {
          type: `image/${fileType}`,
        });

        formData.append("image", file);

        const serverResponse = await axios.post("http://localhost:8080/ocr/imageconv", formData, {

          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setExtractedText(serverResponse.data.extracted_text); 
      } catch (error) {
        console.error("Error sending image to server:", error);
        alert("There was an error processing the image.");
      }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri; 
      console.log("Image URI:", imageUri); 
      setImage(imageUri);  
    } else {
      console.log("No image selected.");
    }
  };
  
  return (
    <Background>
      <View style={styles.topButtonsContainer}>
        <Button mode="contained" onPress={() => navigation.navigate("SettingsScreen")}>
          <Text style={styles.topButtonText}>Menu</Text>
        </Button>
        <Button mode="contained" onPress={() => navigation.replace("userScreen")}>
          <Text style={styles.topButtonText}>User</Text>
        </Button>
      </View>
      <Logo />
      <Header>Welcome</Header>
  
      <Button mode="contained" onPress={captureImage}>
        Capture Image
      </Button>
      <Button mode="contained" onPress={pickImage} style={{ marginTop: 10 }}>
        Pick Image from Gallery
      </Button>
  

      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.instructions}>No image selected yet.</Text>
      )}
  
        {extractedText ? (
        <ScrollView contentContainerStyle={styles.textContainer}>
          <Text style={styles.textLabel}>Extracted Text:</Text>
          <Text style={styles.extractedText}>{extractedText}</Text>
        </ScrollView>
      ) : (
        <Text style={styles.instructions}>Upload or capture an image to extract text.</Text>
      )}
  
      <Button mode="contained" onPress={sendImageToServer} style={{ marginTop: 20 }}>
        Submit Image for OCR
      </Button>
  
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "StartScreen" }],
          })
        }
        style={{ marginTop: 20 }}
      >
        Sign out
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    position: "absolute",
    top: 0,
    width: "50%",
    padding: 20,
    backgroundColor: "#f8f8f8",
    zIndex: 10,
  },
  topButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
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
  textContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    flex: 1, // Ensure this container uses available space
    maxHeight: 180, // Limit height to prevent it from overflowing
  },
  textLabel: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  extractedText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20, // Add line height for better readability
  },
  instructions: {
    marginTop: 20,
    fontSize: 14,
    color: "#888",
  },
});
