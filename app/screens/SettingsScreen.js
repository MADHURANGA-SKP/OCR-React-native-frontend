import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper"; 
import Background from "../../components/Background";
import BackButton from "../../components/BackButton";

export default function SettingsScreen({ navigation }) {
  
  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("HometScreen")} />
      <View style={styles.container}>
        <Text style={styles.header}>Menu</Text>

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
          onPress={() => navigation.navigate("HometScreen")}
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  button: {
    marginVertical: 16,
    width: "100%", 
  },
  topButtonText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});