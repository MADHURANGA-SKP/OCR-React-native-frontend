import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Capture() {
  return (
    <Image
      source={require("../assets/items/logout.png")}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
});
