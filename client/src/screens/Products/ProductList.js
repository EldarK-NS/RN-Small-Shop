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

export default function ProductList({ item }) {
  return (
    <View activeOpacity={0.5} style={{width:'50%'}} >
      <TouchableOpacity style={styles.container}>
        <ProductCart {...item} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width / 2,
    backgroundColor:'gainsboro'
  },
});
