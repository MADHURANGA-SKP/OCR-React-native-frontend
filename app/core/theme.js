// themes.js
import { DefaultTheme, DarkTheme } from "react-native-paper";

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#58d68d",
    background: "#FFFFFF",
    surface: "#FFFFFF",
    text: "#2F2F2F",
    secondary: "#1F2732",
    error: "#ED1C24",
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#58d68d",
    background: "#121212",
    surface: "#1E1E1E",
    text: "#FFFFFF",
    secondary: "#A8A8A8",
    error: "#ED1C24",
  },
};
