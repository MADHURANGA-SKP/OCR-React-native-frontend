import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper"; // Import Button from react-native-paper
import Background from "../../components/Background";
import BackButton from "../../components/BackButton";

export default function SettingsScreen({ navigation }) {
  
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <View style={styles.container}>
        <Text style={styles.header}>Menu</Text>

        {/* Button with Text inside */}
        <Button
          mode="contained"
          onPress={() => navigation.navigate("userScreen")}
          style={styles.button}
        >
          <Text style={styles.topButtonText}>Open User Profile</Text>
        </Button>

        <Button
          mode="contained"
          onPress={() => navigation.navigate("ExtractedImagesListScreen")}
          style={styles.button}
        >
          <Text style={styles.topButtonText}>View Extracted Images</Text>
        </Button>

        <Button
          mode="contained"
          onPress={() => navigation.navigate("HomeScreen")}
          style={styles.button}
        >
          <Text style={styles.topButtonText}>Home</Text>
        </Button>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align buttons to top
    alignItems: "flex-start", // Align buttons to left
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  button: {
    marginVertical: 16,
    width: "100%", // Ensure buttons take up full width
  },
  topButtonText: {
    fontSize: 16,
    color: "white", // White color for the text inside the button
    textAlign: "center", // Center the text inside the button
  },
});
