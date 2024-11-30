import React from "react";
import { Image, StyleSheet } from "react-native";

export default function LoginImg2() {
  return (
    <Image
      source={require("../assets/items/loginImg2.png")}
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
