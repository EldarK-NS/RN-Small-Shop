import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox } from "react-native";
import Header from "./src/Components/Header";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/Navigators/MainNavigator";
import { Provider } from "react-redux";
import store from "./redux/store";
import Toast from "react-native-toast-message";
import Auth from "./context/store/Auth";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <MainNavigator />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}
