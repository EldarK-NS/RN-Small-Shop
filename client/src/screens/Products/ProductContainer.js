import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import { Container, Header, Icon, Input, Text, Item } from "native-base";

import data from "../../../assets/data/products.json";
import productCategories from "../../../assets/data/094 categories.json";
import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProduct";
import Banner from "../../Components/Banner";
import CategoryFilter from "./CategoryFilter";

const { height } = Dimensions.get("window");

export default function ProductContainer() {
  console.log(productCategories);
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productCtg, setProductCtg] = useState([]);

  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    setCategories(productCategories);
    setProductCtg(data);
    setActive(-1);
    setInitialState(data);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setCategories([]);
      setActive();
      setInitialState();
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

  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductCtg(initialState), setActive(true)]
        : [
            setProductCtg(
              products.filter((i) => i.category.id === ctg),
              setActive(true)
            ),
          ];
    }
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
        <ScrollView>
          <View>
            <View>
              <Banner />
            </View>
            <View>
              <CategoryFilter
                categories={categories}
                categoryFilter={changeCtg}
                productCtg={productCtg}
                setActive={setActive}
                active={active}
              />
            </View>
            {productCtg.length > 0 ? (
              <View style={styles.listContainer}>
                {productCtg.map((item) => {
                  return <ProductList key={item._id} item={item} />;
                })}
              </View>
            ) : (
              <View style={[styles.center, { height: "40%" }]}>
                <Text style={{ color: "black" }}>No products found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "gainsboro",
//   },
  listContainer: {
    height: height,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    alignItems: "center",
  },
});
