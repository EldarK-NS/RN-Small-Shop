import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Button,
  Pressable,
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/cartActions";

const { width } = Dimensions.get("window");

function ProductCart(props) {
  const { name, price, image, countInStock } = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: image
            ? image
            : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
        }}
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
      </Text>
      <Text style={styles.price}>${price}</Text>
      {countInStock > 0 ? (
        <Pressable
          style={styles.buttonContainer}
          onPress={() => {
            props.addItemToCart(props);
          }}
        >
          <Text style={styles.button}>ADD</Text>
        </Pressable>
      ) : (
        <Text style={{ marginTop: 20, color: "red" }}>
          Currently unavalible
        </Text>
      )}
    </View>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) => {
      return dispatch(actions.addToCart({ quantity: 1, product }));
    },
  };
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
  },
  image: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 30,
    backgroundColor: "transparent",
    position: "absolute",
    top: -45,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: "transparent",
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  price: {
    marginTop: 10,
    color: "orange",
    fontSize: 20,
    textAlign: "center",
  },
  buttonContainer: {
    marginBottom: 60,
  },
  button: {
    padding: 3,
    width: 60,
    textAlign: "center",
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "green",
    color: "white",
  },
});
export default connect(null, mapDispatchToProps)(ProductCart);
