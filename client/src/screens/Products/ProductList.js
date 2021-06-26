import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ProductCart from "./ProductCart";

const { width } = Dimensions.get("window");

export default function ProductList({ key, item }) {
  return (
    <TouchableOpacity activeOpacity={0.5}>
      <View style={styles.container}>
        <ProductCart {...item} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width / 2,
  },
});
