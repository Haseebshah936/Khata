import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import ProductBought from "./ProductBought";
import { Ionicons } from "@expo/vector-icons";
import RenderRightActionProduct from "./RenderRightActionProduct";
import { useDispatch, useSelector } from "react-redux";
import { setKey, setStatus } from "../redux/Actions";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import color from "../Style/color";

function ThingsBought({ navigation, route }) {
  // const data = route.params.data;
  const [isLoading, setLoading] = useState(true);
  const [scrollEnable, setScrollEnable] = useState(true);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Reducer);
  // const key = state.key;
  const [refreshing, setRefreshing] = useState(false);
  const key = route.params;
  let user;
  let data;
  const [showOnlyPaid, setOnlyPaid] = useState(false);
  const [showOnlyNotPaid, setOnlyNotPaid] = useState(true);
  const [showAll, setAll] = useState(false);

  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [uri, setURI] = useState("");
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  try {
    if (state) {
      user = state.data.filter((m) => m.key == key)[0];
      let temp = user.data;
      if (showOnlyNotPaid) {
        data = temp.filter((m) => m.status != true);
      }
      if (showOnlyPaid) {
        data = temp.filter((m) => m.status === true);
      }
      if (showAll) {
        data = temp;
      }
      // data = user.data;
    }
  } catch (error) {
    console.log(error);
  }
  // console.log(data1);

  const profileGethering = async () => {
    dispatch(setKey(key));
  };

  useEffect(() => {
    profileGethering()
      .then(() => {
        setName(user.userName);
        setURI(user.uri);
        setLoading(false);
        setRefreshing(false);
      })
      .catch(console.log);
  }, [count]);

  const header = () => {
    return (
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.pop()}
          >
            <Ionicons name="arrow-back-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate("KhataProfile", user)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            {uri === "" ? (
              <Image
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 50,
                  marginLeft: 15,
                  marginRight: 10,
                }}
                source={require("../../assets/icon.png")}
              />
            ) : (
              <Image
                style={{
                  borderRadius: 50,
                  marginLeft: 15,
                  marginRight: 10,
                }}
                source={{
                  height: 40,
                  width: 40,
                  uri,
                }}
              />
            )}
            <Text
              style={{
                color: "white",
                marginRight: 20,
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              {name}
            </Text>
          </TouchableOpacity>
        </View>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity
              activeOpacity={0.6}
              style={{ alignSelf: "center", padding: 0 }}
              onPress={openMenu}
            >
              <Ionicons name="ellipsis-vertical" size={24} color="white" />
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={() => {
              setAll(false);
              setOnlyNotPaid(false);
              setOnlyPaid(true);
              closeMenu();
            }}
            title="Show only Paid"
          />
          <Menu.Item
            onPress={() => {
              setAll(false);
              setOnlyNotPaid(true);
              setOnlyPaid(false);
              closeMenu();
            }}
            title="Show only Not Paid"
          />
          <Menu.Item
            onPress={() => {
              setAll(true);
              setOnlyNotPaid(false);
              setOnlyPaid(false);
              closeMenu();
            }}
            title="Show All"
          />
        </Menu>
      </View>
    );
  };
  // const stopScroll = () =>{
  //   setScrollEnable(false)
  // }

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator
            style={{ marginTop: Constants.statusBarHeight * 1.2 }}
            size={"large"}
            color={color.primary}
          />
        ) : (
          <>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={scrollEnable}
              ListHeaderComponent={<View>{header()}</View>}
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
                        Alert.alert(
                          "Confirmation",
                          "Are you sure the payment for the product is done?",
                          [
                            {
                              text: "No",
                            },
                            {
                              text: "Yes",
                              onPress: () => dispatch(setStatus(item.key)),
                            },
                          ]
                        );

                        setScrollEnable(true);
                      }}
                    />
                  )}
                />
              )}
              ItemSeparatorComponent={() => (
                <View style={{ backgroundColor: "white", padding: 10 }} />
              )}
              refreshing={refreshing}
              onRefresh={() => {
                setCount(count + 1);
              }}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate("AddProduct")}
              activeOpacity={0.6}
            >
              <AntDesign name="plus" size={30} color="orange" />
            </TouchableOpacity>
          </>
        )}
        <StatusBar style="auto" hidden />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: "center",
  },
  addButton: {
    position: "absolute",
    backgroundColor: "white",
    width: 50,
    borderRadius: 30,
    marginBottom: 20,
    padding: 10,
    top: "88%",
    left: "80%",
    justifyContent: "flex-end",
    elevation: 20,
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  header: {
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight * 1.1,
    paddingLeft: 15,
    paddingRight: 20,
    padding: 12,
    backgroundColor: color.primary,
    justifyContent: "space-between",
    marginBottom: 15,
  },
});
export default ThingsBought;
