import React from "react";
import { StyleSheet, View } from "react-native";
import { Badge, Text } from "native-base";
import { connect } from "react-redux";

function CartIcon(props) {
  return (
    <>
      {props.cartItems.length ? (
        <Badge style={styles.badge}>
          <Text style={styles.text}>{props.cartItems.length}</Text>
        </Badge>
      ) : null}
    </>
  );
}
const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems,
  };
};

const styles = StyleSheet.create({
  badge: {
    width: 25,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -4,
    right: -15,
  },
  text: {
    fontSize: 12,
    width: 100,
    fontWeight: "bold",
  },
});
export default connect(mapStateToProps, null)(CartIcon);
