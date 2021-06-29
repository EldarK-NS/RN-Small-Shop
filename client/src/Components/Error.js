import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Error(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    margin: 10,
  },
  text: {
    color: "red",
    fontWeight:'bold',
    fontSize:16
  },
});
