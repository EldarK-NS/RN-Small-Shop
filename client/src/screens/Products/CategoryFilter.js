import React from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";

import { ListItem, Badge, Text } from "native-base";

export default function CategoryFilter(props) {
  const { categories, categoryFilter, productCtg, setActive, active } = props;
  return (
    <ScrollView
      boubces={true}
      horizontal
      style={{ backgroundColor: "#f2f2f2" }}
      showsHorizontalScrollIndicator={false}
    >
      <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
        <TouchableOpacity
          key={1}
          onPress={() => {
            categoryFilter("all"), setActive(-1);
          }}
        >
          <Badge
            style={[
              styles.center,
              { margin: 5 },
              active == -1 ? styles.active : styles.inactive,
            ]}
          >
            <Text style={{ color: "white" }}>all</Text>
          </Badge>
        </TouchableOpacity>
        {categories.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => {
              categoryFilter(item._id),
               setActive(categories.indexOf(item));
            }}
          >
            <Badge
              style={[
                styles.center,
                { margin: 5 },
                active == categories.indexOf(item)
                  ? styles.active
                  : styles.inactive,
              ]}
            >
              <Text style={{ color: "white" }}>{item.name}</Text>
            </Badge>
          </TouchableOpacity>
        ))}
      </ListItem>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#03bafc",
  },
  inactive: {
    backgroundColor: "#a0e1eb",
  },
});
