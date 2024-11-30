import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Capture() {
  return (
    <Image
      source={require("../assets/items/submit.png")}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
});
