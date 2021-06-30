import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/cartActions";
import {
  Container,
  Text,
  Left,
  Right,
  H1,
  ListItem,
  Thumbnail,
  Body,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import CartItem from "./CartItem";
import Icon from "react-native-vector-icons/FontAwesome";
import EasyButton from "./../../Components/StyledComponents/EasyButton";

const { height, width } = Dimensions.get("window");

function Cart(props) {
  let total = 0;
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });
  return (
    <>
      {props.cartItems.length ? (
        <Container>
          <H1 style={{ alignSelf: "center" }}>Cart</H1>
          <SwipeListView
            data={props.cartItems}
            renderItem={(data) => <CartItem item={data} />}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  onPress={() => props.removeFromCart(data.item)}
                  style={styles.hiddenButton}
                >
                  <Icon name="trash" color={"white"} size={30} />
                </TouchableOpacity>
              </View>
            )}
            //!! keyExtractor={item=>item._id}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={30}
            leftOpenValue={60}
            stopLeftSwipe={60}
            rightOpenValue={-60}
          />
          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>${total}</Text>
            </Left>
            <Right>
              <EasyButton
                danger
                medium
                onPress={() => {
                  props.clearCart();
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Clear
                </Text>
              </EasyButton>
            </Right>
            <Right>
              <EasyButton
                onPress={() => props.navigation.navigate("Checkout")}
                primary
                medium
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Checkout
                </Text>
              </EasyButton>
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Cart is empty</Text>
          <Text>Add product to your cart to get started</Text>
        </Container>
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    elevation: 20,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: "red",
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 17.5,
    height: 55,
    width: width / 1.2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
