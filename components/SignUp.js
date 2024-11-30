import React from "react";
import { Image, StyleSheet } from "react-native";

export default function SignUp() {
  return (
    <Image
      source={require("../assets/items/signUp.png")}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 180,
    marginBottom: 8,
  },
});
