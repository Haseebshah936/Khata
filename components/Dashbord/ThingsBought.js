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
import { AntDesign } from "@expo/vector-icons"
import ProductBought from "./ProductBought";

const DATA = [
    {
        first_name: "Haseeb"
    },
    {
        first_name: "Haseeb"
    },
    {
        first_name: "Haseeb"
    },
    {
        first_name: "Haseeb"
    },
    {
        first_name: "Haseeb"
    },
    {
        first_name: "Haseeb"
    },
    {
        first_name: "Haseeb"
    },
    {
        first_name: "Haseeb"
    },
    {
        first_name: "Haseeb"
    },
    {
        first_name: "Haseeb"
    },
    {
        first_name: "Haseeb"
    },
    {
        first_name: "Haseeb"
    },
]

function ThingsBought({ navigation }) {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=2")
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ProductBought
            avatar={item.avatar}
            name={item.first_name}
            phoneNo={item.last_name}
            amountToPay={item.email}
            onPress={() => navigation.navigate("ViewProduct")}
          />
        )}
        ItemSeparatorComponent={() => (
          <View style={{ backgroundColor: "white", padding: 10 }} />
        )}
      />
      <TouchableOpacity style={styles.addButton} >
            <AntDesign  onPress={() => navigation.navigate("AddProduct")} name="plus" size={30} color='orange' />
      </TouchableOpacity>
      <StatusBar style="auto" hidden/>
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
    position: 'absolute',
    backgroundColor: 'white',
    width: 50,
    borderRadius: 30,
    marginBottom: 20,
    padding: 10,
    top: "94%",
    left: "80%",
    justifyContent: 'flex-end',
    elevation: 20,
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 5,
  }
});
export default ThingsBought;