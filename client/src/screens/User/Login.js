import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import FormContainer from "../../Components/Form/FormContainer";
import Input from "../../Components/Form/Input";
import Error from "../../Components/Error";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EasyButton from "../../Components/StyledComponents/EasyButton";

import AuthGlobal from "../../../context/store/AuthGlobal";
import { loginUser } from "../../../context/actions/Auth.actions";

export default function Login(props) {
  const context = useContext(AuthGlobal);

  const [email, setEmail] = useState("nur@nur.ru");
  const [password, setPassword] = useState("qwerty");
  const [error, setError] = useState("");

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("UserProfile");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };
    if (email === "" || password === "") {
      setError("Please fill in your credentials!");
    } else {
      loginUser(user, context.dispatch);
    }
  };

  return (
    <FormContainer title={"Login"}>
      <Input
        placeholder={"Enter Email"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        placeholder={"Enter Password"}
        name={"password"}
        id={"password"}
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <EasyButton onPress={() => handleSubmit()} large primary>
          <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
        </EasyButton>
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Don't have an acccount yet?</Text>
        <EasyButton
          onPress={() => props.navigation.navigate("Register")}
          large
          secondary
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
        </EasyButton>
      </View>
    </FormContainer>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
});
