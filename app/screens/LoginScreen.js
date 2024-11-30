import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useUser } from "../helpers/UserContext";
import axios from "axios";
import Background from "../../components/Background";
import LoginImg2 from "../../components/LoginImg2";
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

    setErrorMessage("");

    try {
      const response = await axios.post('http://localhost:8080/ocr/login', {
        user_name: UserName.value,
        hashed_password: password.value,
      });

      if (response.status === 200) {
        alert("Success", "You logged succesfully");
        navigation.reset({
          index: 0,
          routes: [{ name: "HometScreen" }],
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          alert("Error", "Please sign up first.");
        } else {
          alert("Error", "An error occurred. Please try again.");
        }
      } else {
        alert("Error", "Unable to reach the server. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
    
    try {
      const response = await axios.post("http://localhost:8080/ocr/login", {
        user_name: UserName.value,
        hashed_password: password.value,
      });
  
      const { session_id, access_token, user } = response.data;
  
      setUserData(user);
  
      localStorage.setItem("session_id", session_id);
      localStorage.setItem("access_token", access_token);
    } catch (error) {
      console.error("Login failed", error);
    }

  };

  return (
    <Background>
      
      <LoginImg2 />
      <Header>Hello.</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        mode="outlined"
        value={UserName.value}
        onChangeText={(text) => setUserName({ value: text, error: "" })}
        autoCapitalize="none"
        autoCompleteType="username"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        mode="outlined"
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