import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Cart from "./../screens/Cart/Cart";
import CheckoutNavigator from './CheckoutNavigator';

const Stack = createStackNavigator();

export default function CartNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutNavigator}
        options={{
         //  headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
