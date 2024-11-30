import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView  } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import BackButton from "../../components/BackButton";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Capture from "../../components/Capture";
import Gallery from "../../components/Gallery";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { useUser } from "../helpers/UserContext";

export default function HomeScreen({ navigation }) {
  const { user } = useUser(); // Get user from context
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
    }
  };

  
  // Function to send image to the server for OCR
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

        // Handle the response
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
      <View style={styles.navBar}>
          <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")} style={styles.navButton}>
            <Text style={styles.navButtonText}>Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("userScreen")} style={styles.navButton}>
            <Text style={styles.navButtonText}>Profile</Text>
          </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("StartScreen")} style={styles.navButton}>
          <Text style={styles.navButtonText}
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "StartScreen" }],
                  })
                }>
              Logout
        </Text>
        </TouchableOpacity>
    </View>
        <Button onPress={captureImage}  style={{ marginTop: 40 }}>
          <Capture />
        </Button>

     
        <Button  onPress={pickImage} style={{ marginTop: 1 }}>
          <Gallery />
        </Button>
      {/* Only show image if it exists */}
      {image ? (
        <Image source={{ uri: image }} style={styles.imagetext} />
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
        <View style={styles.topButtonsContainer}>
          <Button  mode="contained" onPress={sendImageToServer} style={{ marginTop: 5 }}>
          submit
          </Button>
        </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    position: "related",
    top: 0,
    padding: 40,
    zIndex: 10,
  },
  topButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  imagetext: {
    width: 100,
    height: 100,
    marginTop: 5,
    borderRadius: 10,
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
    marginTop: 10,
    paddingHorizontal: 10,
    flex: 1, 
    maxHeight: 80,
  },
  textLabel: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  extractedText: {
    fontSize: 10,
    color: "#333",
    lineHeight: 13, 
  },
  
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    backgroundColor: "#58d68d",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    position: "absolute",
    top: 0,
    width: "100%",
    borderRadius:115,
    marginTop:8,
  },
  navButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 14,
    color: "#FFF",
    hover: "#000",
    fontWeight: "bold",
  },
  
});
