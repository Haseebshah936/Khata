import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Constants from "expo-constants";
import Client from "./Client";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import RenderRightAction from "./RenderRightAction";
import { android, ios } from "../../APIKeys";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
import { useDispatch, useSelector } from "react-redux";
import * as Network from "expo-network";
import {
  addKhataAccount,
  addProductData,
  check,
  loadData,
  remove,
  setKey,
  signOut,
} from "../redux/Actions";
import { auth, db } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import color from "../Style/color";
import Check from "../Login/Check";

function UserData({ navigation, route }) {
  // const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const bannerID =
    Platform.OS === "ios" ? ios.admobBanner : android.admobBanner;
  const interstitialID =
    Platform.OS === "ios" ? ios.admobInterstitial : android.admobInterstitial;
  const state = useSelector((state) => state.Reducer);
  // const isLoading = state.isLoading;
  const [data, setData] = useState(state.data);
  // const data = state.data;
  const dispatch = useDispatch();
  // const [count, setCount] = useState(0);
  const [resfreshing, setRefreshing] = useState(false);

  const instential = async () => {
    try {
      await AdMobInterstitial.setAdUnitID(interstitialID);
      await AdMobInterstitial.requestAdAsync({
        servePersonalizedAds: true,
      }).catch(console.log);
      if (await AdMobInterstitial.getIsReadyAsync().valueOf())
        await AdMobInterstitial.showAdAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const run = async () => {
    try {
      await dispatch(loadData());
    } catch (error) {
      console.log(error);
    }
  };

  const path = route.params;

  const [first, setFirst] = useState(true);

  useEffect(() => {
    // instential()
    if (path) {
      // alert(JSON.stringify(path.path));
      if (path.path === "Account") navigation.navigate("Account");
    }
    setData(state.data);
  }, [state.data, path]);

  const searchName = (text) => {
    if (text === "") {
      setData(state.data);
    } else {
      setData(
        state.data.filter((m) =>
          m.userName.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };
  const header = () => {
    return (
      <View
        style={{
          paddingTop: Constants.statusBarHeight * 1,
          paddingLeft: 15,
          paddingRight: 20,
          paddingBottom: 10,
          backgroundColor: color.primary,
          justifyContent: "space-between",
          marginBottom: 15,
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "80%",
            padding: 5,
            paddingLeft: 8,
            borderRadius: 20,
            flexDirection: "row",
          }}
        >
          <EvilIcons
            style={{ alignSelf: "center" }}
            name="search"
            size={24}
            color="black"
          />
          <TextInput
            onChangeText={(text) => searchName(text)}
            placeholder={"Enter Name"}
            style={{ flex: 1, paddingLeft: 5 }}
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <Button title={"Open"} onPress={()=> navigation.openDrawer()} /> */}
      {isLoading ? (
        <ActivityIndicator size={"large"} color={color.primary} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={<View>{header()}</View>}
          renderItem={({ item }) => (
            <Client
              avatar={item.uri}
              name={item.userName}
              phoneNo={item.phoneNo}
              amountToPay={item.address}
              onPress={() => {
                navigation.navigate("ThingsBought", item.key);
              }}
              renderRightActions={() => (
                <RenderRightAction
                  onPress={() =>
                    Alert.alert(
                      "Confirmation",
                      "Are you sure want to remove the Khata?",
                      [
                        {
                          text: "No",
                        },
                        {
                          text: "Yes",
                          onPress: () => {
                            check().then((status) => {
                              if (status.isInternetReachable) {
                                dispatch(remove(item.key));
                              } else {
                                Alert.alert(
                                  "Internet not Connected",
                                  "You are not connected to the internet. You can only view data and add data in offline notes. Which you can add later once you are connected.",
                                  [
                                    {
                                      text: "OK",
                                    },
                                    {
                                      text: "Go to offline notes",
                                      onPress: () =>
                                        navigation.navigate("Account"),
                                    },
                                  ]
                                );
                              }
                            });
                          },
                        },
                      ]
                    )
                  }
                />
              )}
            />
          )}
          ItemSeparatorComponent={() => (
            <View style={{ backgroundColor: "white", padding: 10 }} />
          )}
          refreshing={resfreshing}
          onRefresh={() => {
            run().then(() => {
              setRefreshing(false);
              // setLoading(false);
            });
          }}
        />
      )}
      <View style={{ alignSelf: "center" }}>
        {<AdMobBanner
          bannerSize="leaderboard"
          adUnitID={bannerID}
          servePersonalizedAds={true}
        /> ? (
          <AdMobBanner
            bannerSize="leaderboard"
            adUnitID={bannerID}
            servePersonalizedAds={true}
          />
        ) : (
          <ActivityIndicator
            style={{ marginBottom: 10 }}
            size={"large"}
            color={color.primary}
          />
        )}
      </View>
      <StatusBar style="auto" hidden />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    justifyContent: "space-between",
  },
  addButton: {
    // position: 'absolute',
    backgroundColor: "orange",
    width: 50,
    borderRadius: 30,
    marginBottom: 20,
    left: "82%",
    justifyContent: "flex-end",
    elevation: 30,
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
export default UserData;
