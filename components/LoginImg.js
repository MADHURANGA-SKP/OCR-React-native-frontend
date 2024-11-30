import React from "react";
import { Image, StyleSheet } from "react-native";

export default function LoginImg() {
  return (
    <Image
      source={require("../assets/items/loginImg.png")}
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
