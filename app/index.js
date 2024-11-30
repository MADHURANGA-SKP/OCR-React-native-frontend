import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./core/theme";
import { UserProvider } from "./helpers/UserContext";
import { StartScreen, LoginScreen, RegisterScreen, ResetPasswordScreen,ExtractedImagesListScreen, HomeScreen, SettingsScreen, UserProfileScreen } from "./screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <Provider theme={theme}>
        <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
        <Stack.Screen name="HomeScreen" component={HometScreen} />
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="userScreen" component={UserProfileScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen name="ExtractedImagesListScreen" component={ExtractedImagesListScreen} />
      </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    </UserProvider>
  );
}
