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
import Toast from "react-native-toast-message";
import EasyButton from "../../Components/StyledComponents/EasyButton";

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
        <View style={{ marginBottom: 60 }}>
          <EasyButton
            onPress={() => {
              props.addItemToCart(props),
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: `${name} added to Cart`,
                  text2: "Go to your cart to complete order",
                });
            }}
            primary
            medium
          >
            <Text style={{ color: "white" }}>ADD</Text>
          </EasyButton>
        </View>
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
  //   button: {
  //     padding: 3,
  //     width: 60,
  //     textAlign: "center",
  //     borderRadius: 5,
  //     marginTop: 5,
  //     backgroundColor: "green",
  //     color: "white",
  //   },
});
export default connect(null, mapDispatchToProps)(ProductCart);
