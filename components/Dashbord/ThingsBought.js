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
import Client from "./Client";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';

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
        {/* <Button title={"Open"} onPress={()=> navigation.openDrawer()} /> */}
      <FlatList
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Client
            avatar={item.avatar}
            name={item.first_name}
            phoneNo={item.last_name}
            amountToPay={item.email}
            // onPress={() => navigation.navigate("Todo")}
          />
        )}
        ItemSeparatorComponent={() => (
          <View style={{ backgroundColor: "white", padding: 10 }} />
        )}
      />
{/* <TouchableOpacity style={styles.addButton} >
      <AntDesign  onPress={() => navigation.navigate("Todo")} name="pluscircle" size={50} color="white" />
</TouchableOpacity> */}
      <StatusBar style="auto" />
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
    // position: 'absolute',
    backgroundColor: 'orange',
    width: 50,
    borderRadius: 30,
    marginBottom: 20,
    left: "82%",
    justifyContent: 'flex-end',
    elevation: 30,
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 5
  }
});
export default ThingsBought;