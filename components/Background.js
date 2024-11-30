import React from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";

import { theme } from "../app/core/theme";

export default function Background({ children }) {
  const { width, height } = useWindowDimensions();

  // Define responsive styles based on dimensions
  const responsiveStyles = {
    container: {
      flex: 1,
      padding: width > 600 ? 40 : 20, // Adjust padding for larger screens
      maxWidth: width > 600 ? 600 : 340, // Increase maxWidth for tablets/desktops
    },
  };

  return (
    <ImageBackground
      // source={require("../assets/items/background.jpg")}
      resizeMode="repeat"
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={[styles.container, responsiveStyles.container]}
        behavior="padding"
      >
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
