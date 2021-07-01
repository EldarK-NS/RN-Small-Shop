import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Button,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import EasyButton from "../../Components/StyledComponents/EasyButton";

const { width } = Dimensions.get("window");

export default function ListItem(props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableHighlight
              underlayColor="E8E8E8"
              onPress={() => {
                setModalVisible(false);
              }}
              style={styles.touch}
            >
              <Icon name="close" size={20} />
            </TouchableHighlight>
            <EasyButton
              medium
              secondary
              onPress={() => [
                props.navigation.navigate("ProductForm", { item: props }),
                setModalVisible(false),
              ]}
            >
              <Text style={{ fontWeight: "bold" }}>Edit</Text>
            </EasyButton>
            <EasyButton
              medium
              danger
              onPress={() => [
                props.deleteItem(props.id),
                setModalVisible(false),
              ]}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </EasyButton>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("ProductDetail", { item: props });
        }}
        onLongPress={() => setModalVisible(true)}
        style={[
          styles.container,
          { backgroundColor: props.index % 2 === 0 ? "white" : "gainsboro" },
        ]}
      >
        <Image
          source={{
            uri: props.image
              ? props.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.item}> {props.brand}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.item}>
          {props.name}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.item}>
          {props.category.name}
        </Text>
        <Text style={styles.item}>${props.price}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    width: width,
  },
  image: {
    borderRadius: 50,
    width: width / 6,
    height: 20,
    margin: 3,
  },
  item: {
    flexWrap: "wrap",
    margin: 3,
    width: width / 6,
  },
  touch: {
    alignSelf: "flex-end",
    position: "absolute",
    top: 5,
    right: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
});
