import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import FormContainer from "./../../Components/Form/FormContainer";
import Input from "./../../Components/Form/Input";
import Error from "./../../Components/Error";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import baseURL from "./../../../assets/common/baseUrl";
import Toast from "react-native-toast-message";

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "") {
      setError("Please fill in the form correctly!");
    }
    let user = {
      name: name,
      email: email,
      phone: phone,
      password: password,
      isAdmin: false,
    };
    axios
      .post(`${baseURL}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registartion Succeeded!!!",
            text2: "Please login into your account",
          });
          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 1000);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
        console.log(error);
      });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={100}
      enableOnAndroid={true}
    >
      <FormContainer title={"Register"}>
        <Input
          placeholder={" Email"}
          name={"email"}
          id={"email"}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={" Name"}
          name={"name"}
          id={"name"}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder={"Phone number"}
          name={"phone"}
          id={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <Button title={"Register"} onPress={() => register()} />
        </View>
        <View>
          <Button
            title={"Back to Login"}
            onPress={() => props.navigation.navigate("Login")}
          />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
});
