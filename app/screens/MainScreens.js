// MainScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { Switch, Text, Appbar } from "react-native-paper";

export default function MainScreen({ toggleTheme, isDarkTheme }) {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Theme Toggle" />
      </Appbar.Header>
      <View style={styles.content}>
        <Text style={styles.text}>Switch to {isDarkTheme ? "Light" : "Dark"} Mode</Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
