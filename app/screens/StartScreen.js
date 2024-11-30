import React from "react";
import Background from "../../components/Background";
import Logo from "../../components/LoginImg";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Paragraph from "../../components/Paragraph";
import LoginImg from "../../components/LoginImg";

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <LoginImg />
      <Header>Welcome to GoOCR!</Header>
      <Paragraph>
      Your Gateway to Modern Solutions
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
