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

import Menu from "../../components/Menu";
import Submit from "../../components/Submit";
import Logout from "../../components/Logout";
import Usere from "../../components/Usere";





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

      // Convert image URI to a Blob and then to a File
      const uriParts = image.split('.');
      const fileType = uriParts[uriParts.length - 1];

      try {
        // Fetch the image and convert to Blob
        const response = await fetch(image);
        const blob = await response.blob();

        // Convert the Blob to a File object
        const file = new File([blob], `image.${fileType}`, {
          type: `image/${fileType}`,
        });

        // Append the file to FormData
        formData.append("image", file);

        // Send the FormData to the server
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
  <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")} style={styles.navButton}>
    <Text style={styles.navButtonText}>Menu</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")} style={styles.navButton}>
    <Text style={styles.navButtonText}>Profile</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")} style={styles.navButton}>
    <Text style={styles.navButtonText}>
    <Button
        mode=""
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "StartScreen" }],
          })
        }
        style={{ marginTop: 10 }}
      >
        Logout
        {/* <Logout /> */}
      </Button>

    </Text>
  </TouchableOpacity>
  
</View>

    
      
      {/* <View style={styles.topButtonsContainer}> 
        <Button mode="contained" onPress={() => navigation.navigate("SettingsScreen")}>
          <Text style={styles.topButtonText}>Menu</Text>
        </Button>
        <Button mode="contained" onPress={() => navigation.navigate("userScreen")}>
          <Text style={styles.topButtonText}>User</Text>
        </Button>
      </View>
      <Logo />
      <Header>Welcome</Header>*/}

     
      <Button  onPress={captureImage}  style={{ marginTop: 10 }}>
      <Capture />
      </Button>

     
      <Button  onPress={pickImage} style={{ marginTop: 10 }}>
      <Gallery />
      </Button>
        


      

    

      {/* Only show image if it exists */}
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




<     View style={styles.topButtonsContainer}>
        <Button  mode="contained" onPress={sendImageToServer} style={{ marginTop: 20 }}>
        submit
      </Button>

      {/* <Button mode="contained" onPress={() => navigation.navigate("SettingsScreen")}>
          <Text style={styles.topButtonText}>  <Menu />  </Text>
        </Button>
        <Button mode="contained" onPress={() => navigation.navigate("userScreen")}>
          <Text style={styles.topButtonText}>  <Usere /> </Text>
        </Button> */}
  
      
        
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
    width: "50%",
    padding: 20,
   
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

  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    backgroundColor: "#26C761",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "bold",
  },
  
});
