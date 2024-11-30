import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useUser } from "../helpers/UserContext";
import axios from "axios";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import BackButton from "../../components/BackButton";
import { theme } from "../core/theme"; 
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";

export default function LoginScreen({ navigation }) {
  const [UserName, setUserName] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const { setUserData } = useUser();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onLoginPressed = async () => {
    const passwordError = passwordValidator(password.value);
    if (passwordError) {
      setPassword({ ...password, error: passwordError });
      return;
    }

    // Show loading indicator while the request is in progress
    setLoading(true);
    setErrorMessage(""); // Clear any previous error messages

    try {
      // Make POST request to Golang backend API
      const response = await axios.post('http://172.25.141.196:8080/ocr/login', {
        user_name: UserName.value,
        hashed_password: password.value,
      });

      // Handle successful login response (status 200)
      if (response.status === 200) {
        alert("Success", "You logged succesfully");
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeScreen" }],
        });
      }
    } catch (error) {
      if (error.response) {
        // Handle different HTTP status codes
        if (error.response.status === 404) {
          // Show alert for 404 status (user not found)
          alert("Error", "Please sign up first.");
        } else {
          // Show alert for other error responses (e.g., 500, 401, etc.)
          alert("Error", "An error occurred. Please try again.");
        }
      } else {
        // Handle network or other unexpected errors
        alert("Error", "Unable to reach the server. Please check your connection.");
      }
    } finally {
      // Hide loading indicator once request is complete
      setLoading(false);
    }
    
    try {
      const response = await axios.post("http://localhost:8080/ocr/login", {
        user_name: UserName.value,
        hashed_password: password.value,
      });
  
      // Assuming the response structure matches the given one
      const { session_id, access_token, user } = response.data;
  
      // Save user data in the context
      setUserData(user);
  
      // Optionally, save session_id and access_token if needed for further API calls
      localStorage.setItem("session_id", session_id);
      localStorage.setItem("access_token", access_token);
    } catch (error) {
      console.error("Login failed", error);
    }

  };

  return (
    <Background>
      
      <Logo />
      <Header>Hello.</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={UserName.value}
        onChangeText={(text) => setUserName({ value: text, error: "" })}
        autoCapitalize="none"
        autoCompleteType="username"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot your password ?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Log in
      </Button>
      <View style={styles.row}>
        <Text>You do not have an account yet ?</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text style={styles.link}>Create !</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});