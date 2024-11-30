import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Profile() {
  return (
    <Image
      source={require("../assets/items/Personal.png")}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginBottom: 8,
  },
});
