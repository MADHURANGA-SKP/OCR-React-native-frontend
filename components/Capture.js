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
    width: 100,
    height: 100,
    marginBottom: 8,
  },
});
