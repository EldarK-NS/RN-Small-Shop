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

export default function ProductList(props) {
   const {item}=props
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{ width: "50%" }}
      onPress={() =>
        props.navigation.navigate("Product Detail", { item: item })
      }
    >
      <View style={styles.container}>
        <ProductCart {...item} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width / 2,
    backgroundColor: "gainsboro",
  },
});
