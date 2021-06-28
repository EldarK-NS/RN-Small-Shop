import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Item, Picker } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import FormContainer from "./../../../Components/Form/FormContainer";
import Input from "./../../../Components/Form/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";

const countries = require("../../../../assets/countries.json");

function Checkout(props) {
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);

    return () => setOrderItems();
  }, []);
  const checkOut = () => {
    let order = {
      city,
      country,
      dateOrder: Date.now(),
      phone,
      orderItems,
      shippingAddress: address,
      shippingAddress2: address2,
      zip,
    };
    props.navigation.navigate("Payment", { order:order });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      // extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Shipping Address"}>
        <Input
          placeholder={"Phone"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Shipping Address 1 "}
          name={"ShippingAddress1"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={"Shipping Address 2 "}
          name={"ShippingAddress2"}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder={"City "}
          name={"City"}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={"Zip Code "}
          name={"zip"}
          value={zip}
          keyboardType={"numeric"}
          onChangeText={(text) => setZip(text)}
        />
        <Item
          picker
        >
          <Picker
            mode="dropdown"
            iosIcon={
              <Icon
                name="arrow-down"
                color='black'
                style={{ width: undefined }}
              />
            }
            selectedValue={country}
            placeholder="Select your country"
            placeholderStyle={{ color: "#007aff" }}
            placeholderIconColor="#007aff"
            onValueChange={(e) => setCountry(e)}
            style={{  height:50 }}
          >
            {countries.map((c) => (
              <Picker.Item key={c.code} label={c.name} value={c.name} />
            ))}
          </Picker>
        </Item>
        <View style={{ width: '80%', alignItems: "center" }}>
          <Button title="Confirm" onPress={() => checkOut()} style={{width:100}}/>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
}

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems,
  };
};

const styles = StyleSheet.create({});

export default connect(mapStateToProps, null)(Checkout);
