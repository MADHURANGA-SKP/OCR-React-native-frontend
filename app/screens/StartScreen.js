import React from "react";
import Background from "../../components/Background";
import Logo from "../../components/LoginImg";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Paragraph from "../../components/Paragraph";
import LoginImg from "../../components/LoginImg";

export default function StartScreen({ navigation }) {
  const handleLogin = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <Background>
      <LoginImg />
      <Header>Welcome</Header>
      <Paragraph>
        A starter app template for React Native Expo, featuring a ready-to-use
        login screen.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Log in
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Create an account
      </Button>
    </Background>
  );
}
