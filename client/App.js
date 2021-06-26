import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, LogBox } from "react-native";
import ProductContainer from "./src/screens/Products/ProductContainer";
import Header from "./src/Components/Header";

// LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <ProductContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
