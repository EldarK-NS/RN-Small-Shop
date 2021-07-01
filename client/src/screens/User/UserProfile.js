import React, { useContext, useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EasyButton from "../../Components/StyledComponents/EasyButton";

import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";

import AuthGlobal from "../../../context/store/AuthGlobal";
import { logoutUser } from "../../../context/actions/Auth.actions";

export default function UserProfile(props) {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      props.navigation.navigate("Login");
    }
    AsyncStorage.getItem("jwt")
      .then((res) => {
        axios
          .get(`${baseURL}users/${context.stateUser.user.userId}`, {
            headers: { Authorization: `Bearer ${res}` },
          })
          .then((user) => setUserProfile(user.data));
      })
      .catch((error) => console.log(error));
    return () => {
      setUserProfile();
    };
  }, [context.stateUser.isAuthenticated]);

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{ fontSize: 30 }}>
          {userProfile ? userProfile.name : ""}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ marginTop: 10, fontSize: 25 }}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>
          <Text style={{ marginTop: 10, fontSize: 25 }}>
            Phone: {userProfile ? userProfile.phone : ""}
          </Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <EasyButton
          large
          danger
            onPress={() => [
              AsyncStorage.removeItem("jwt"),
              logoutUser(context.dispatch),
            ]}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Sign Out</Text>
          </EasyButton>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});
