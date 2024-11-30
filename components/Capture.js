import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Capture() {
  return (
    <Image
      source={require("../assets/items/Capture.png")}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    marginBottom: 8,
  },
});
