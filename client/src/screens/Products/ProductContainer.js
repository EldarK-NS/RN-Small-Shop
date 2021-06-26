import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, FlatList } from "react-native";
import { Container, Header, Icon, Input, Text, Item } from "native-base";

import data from "../../../assets/data/products.json";
import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProduct";
import Banner from "../../Components/Banner";

export default function ProductContainer() {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
    };
  }, []);
  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };
  const openList = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="search"
            variant="rounded"
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
          />
          {focus == true ? <Icon onPress={onBlur} name="ios-close" /> : null}
        </Item>
      </Header>
      {focus == true ? (
        <SearchedProduct productsFiltered={productsFiltered} />
      ) : (
        <View style={{ backgroundColor: "gainsboro" }}>
          <View>
            <Banner />
          </View>
          <View style={styles.container}>
            <FlatList
              numColumns={2}
              data={products}
              renderItem={({ item }) => (
                <ProductList key={item.id} item={item} />
              )}
              keyExtractor={(item) => item.name}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
});
