import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/User/Login";
import Register from "../screens/User/Register";
import UserProfile from "../screens/User/UserProfile";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function UserNavigator() {
  return <MyStack />;
}
