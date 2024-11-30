import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity,Alert  } from "react-native";
import { Text } from "react-native-paper";
import axios from "axios";
import Background from "../../components/Background";
import SignUp from "../../components/SignUp";
import Header from "../../components/Header";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import BackButton from "../../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState({ value: "", error: "" });
  const [lastName, setLastName] = useState({ value: "", error: "" });
  const [userName, setUserName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [Confirmpassword, setConfirmPassword] = useState({ value: "", error: "" });

  const onSignUpPressed = async () => {
    // Validate input fields
    const firstNameError = nameValidator(firstName.value);
    const lastNameError = nameValidator(lastName.value);
    const userNameError = nameValidator(userName.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || firstNameError || lastNameError) {
      setFirstName({ ...firstName, error: firstNameError });
      setLastName({ ...lastName, error: lastNameError });
      setUserName({ ...userName, error: userNameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    try {
    const response = await axios.post('http://172.25.141.196:8080/ocr/signup', {
      user_name: userName.value,
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      hashed_password: password.value,
    });

    if (response.status === 200) {
      alert("Success", "Account created successfully!", [
        [
          {
            text: "OK",
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: "LoginScreen" }],
              });
            },
          },
        ],
        { cancelable: false }
      ]);
    } else  {
      alert("Server Error", "An error occurred. Please try again.");
    }
  } catch (error) {
    if (error.response) {
      alert("failed to create User, Please try again");
    } else {
      alert("Error", "Unable to reach the server. Please check your connection.");
    }
  } 
  };

  return (
    <Background>
      <Logo />
      <Header>Welcome.</Header>
      <TextInput
        label="FirstName"
        returnKeyType="next"
        value={firstName.value}
        onChangeText={(text) => setFirstName({ value: text, error: "" })}
        error={!!firstName.error}
        errorText={firstName.error}
      />
      <TextInput
        label="LastName"
        returnKeyType="next"
        value={lastName.value}
        onChangeText={(text) => setLastName({ value: text, error: "" })}
        error={!!lastName.error}
        errorText={lastName.error}
      />
      <TextInput
        label="UserName"
        returnKeyType="next"
        value={userName.value}
        onChangeText={(text) => setUserName({ value: text, error: "" })}
        error={!!userName.error}
        errorText={userName.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
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
      <Button
        mode="contained"
        onPress={async () => {
          const success = await onSignUpPressed(); 
          if (!success) {
            navigation.reset({
              index: 0,
              routes: [{ name: "RegisterScreen" }],
            });
          }if (success) {
            navigation.reset({
              index: 0,
              routes: [{ name: "LoginScreen" }],
            });
          }
        }}
        style={{ marginTop: 24 }}
      >
        Register
      </Button>
        <View style={styles.row}>
          <Text>I already have an account !</Text>
        </View>
        
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
            <Text style={styles.link}>Log in</Text>
          </TouchableOpacity>
        </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
