import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import ProductBought from "./ProductBought";
import RenderRightActionProduct from "./RenderRightActionProduct";

const DATA = [
  {
    first_name: "Haseeb",
  },
  {
    first_name: "Haseeb",
  },
  {
    first_name: "Haseeb",
  },
  {
    first_name: "Haseeb",
  },
  {
    first_name: "Haseeb",
  },
  {
    first_name: "Haseeb",
  },
  {
    first_name: "Haseeb",
  },
  {
    first_name: "Haseeb",
  },
  {
    first_name: "Haseeb",
  },
  {
    first_name: "Haseeb",
  },
  {
    first_name: "Haseeb",
  },
  {
    first_name: "Haseeb",
  },
];

function ThingsBought({ navigation, route }) {
  const data = route.params.data;
  const [isLoading, setLoading] = useState(false);
  const [scrollEnable, setScrollEnable] = useState(true);
  // console.log(data);

  useEffect(() => {
    // fetch("https://reqres.in/api/users?page=2")
    //   .then((response) => response.json())
    //   .then((json) => setData(json.data))
    //   .catch((err) => console.error(err))
    //   .finally(() => setLoading(false));
  }, []);

  // const stopScroll = () =>{
  //   setScrollEnable(false)
  // }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={scrollEnable}
        renderItem={({ item }) => (
          <ProductBought
            avatar={item.uri}
            name={item.productName}
            status={item.status}
            amountToPay={item.price}
            onPress={() => navigation.navigate("ViewProduct", item)}
            renderRightActions={() => (
              <RenderRightActionProduct
                onPress={() => {
                  alert("Are you sure");
                  setScrollEnable(true);
                }}
              />
            )}
          />
        )}
        ItemSeparatorComponent={() => (
          <View style={{ backgroundColor: "white", padding: 10 }} />
        )}
      />
      <TouchableOpacity style={styles.addButton}>
        <AntDesign
          onPress={() => navigation.navigate("AddProduct")}
          name="plus"
          size={30}
          color="orange"
        />
      </TouchableOpacity>
      <StatusBar style="auto" hidden />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: "center",
    paddingTop: Constants.statusBarHeight * 1.2,
  },
  addButton: {
    position: "absolute",
    backgroundColor: "white",
    width: 50,
    borderRadius: 30,
    marginBottom: 20,
    padding: 10,
    top: "94%",
    left: "80%",
    justifyContent: "flex-end",
    elevation: 20,
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
export default ThingsBought;
