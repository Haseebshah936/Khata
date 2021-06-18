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
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import Client from "./Client";
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
import { remove, setKey } from "../redux/Actions";

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

function UserData({ navigation }) {
  // const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const bannerID =
    Platform.OS === "ios" ? ios.admobBanner : android.admobBanner;
  const interstitialID =
    Platform.OS === "ios" ? ios.admobInterstitial : android.admobInterstitial;
  const state = useSelector((state) => state);
  const data = state.Reducer.data;
  const dispatch = useDispatch();

  const instential = async () => {
    await AdMobInterstitial.setAdUnitID(interstitialID);
    await AdMobInterstitial.requestAdAsync({
      servePersonalizedAds: true,
    }).catch(console.log);
    if (await AdMobInterstitial.getIsReadyAsync().valueOf())
      await AdMobInterstitial.showAdAsync();
  };

  // console.log(state);

  useEffect(() => {
    instential();
    // const unsubscribe = fetch("https://reqres.in/api/users?page=2")
    //   .then((response) => response.json())
    //   .then((json) => setData(json.data))
    //   .catch((err) => console.error(err))
    //   .finally(() => setLoading(false));
    // return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Button title={"Open"} onPress={()=> navigation.openDrawer()} /> */}
      {isLoading && <ActivityIndicator size={"large"} color={"black"} />}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Client
            avatar={item.uri}
            name={item.userName}
            phoneNo={item.phoneNo}
            amountToPay={item.address}
            onPress={() => {
              dispatch(setKey(item.key));
              navigation.navigate("ThingsBought", item);
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
                        onPress: () => dispatch(remove(item.key)),
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
      />
      <View style={{ alignSelf: "center" }}>
        <AdMobBanner
          bannerSize="leaderboard"
          adUnitID={bannerID}
          servePersonalizedAds={true}
        />
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
    // justifyContent: "center",
    paddingTop: Constants.statusBarHeight * 1.2,
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
