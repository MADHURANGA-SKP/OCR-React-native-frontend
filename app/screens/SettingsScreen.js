import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper"; 
import Background from "../../components/Background";
import BackButton from "../../components/BackButton";
import Men from "../../components/menucom";

export default function SettingsScreen({ navigation }) {
  
  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("HometScreen")} />
        <Men/>
      <View style={styles.container}>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  buttonContainer: {
    justifyContent: "flex-end",
  },
  button: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 2,
  },
  topButtonText: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
});