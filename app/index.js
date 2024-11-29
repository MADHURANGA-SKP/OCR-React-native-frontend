import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./core/theme";
import { StartScreen, LoginScreen, RegisterScreen, ResetPasswordScreen,ExtractedImagesListScreen, HomeScreen, SettingsScreen, userScreen } from "./screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
       <NavigationContainer>
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="userScreen" component={userScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
      <Stack.Screen name="ExtractedImagesListScreen" component={ExtractedImagesListScreen} />
    </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
