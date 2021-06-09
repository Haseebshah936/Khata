import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  FlatList,
  Platform,
} from "react-native";
import { auth } from "../../../firebase";
import Profile from "./Profile";
import icons from "./icons";
import Icon from "./Icon";
import Constants from "expo-constants";
import styles from "../../Style/styles";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
import { android, ios } from "../../../APIKeys";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/Actions";

function Account({ navigation }) {
  // const user = auth.currentUser;
  const store = useSelector((state) => state);
  const bannerID =
    Platform.OS === "ios" ? ios.admobBanner : android.admobBanner;
  const dispatch = useDispatch();
  // const signOut = () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       navigation.replace("Login");
  //     })
  //     .catch((error) => {
  //       // An error happened.
  //     });

  //   // AsyncStorage.setItem("Todo", JSON.stringify([])).then(() =>
  //   //   console.log(value + "After Signout")
  //   // );
  // };
  console.log("State", store);
  const check = () => {
    console.log(user);
  };
  return (
    <SafeAreaView style={styles1.container}>
      <View
        style={[
          styles1.design,
          {
            backgroundColor: "#ff7800",
            elevation: 60,
            paddingTop: Constants.statusBarHeight,
          },
        ]}
      >
        <Profile
          image={store.Reducer.profilePic}
          userName={store.Reducer.displayName}
          fontSize={20}
          fontColor={"white"}
          marginTop={0}
        />
      </View>

      <View style={styles1.design1}>
        <View style={[styles1.design1, { elevation: 10, bottom: 10 }]}>
          <Profile
            iconComponent={
              <Icon
                iconName="email"
                iconSize={24}
                iconColor="white"
                backgroundColor="#91d5e6"
              />
            }
            userName={"My Account"}
            onPress={() => check()}
          />
        </View>
        <View>
          <Profile
            iconComponent={
              <Icon
                iconName="exit-to-app"
                iconSize={24}
                iconColor="white"
                backgroundColor="#ffd000"
              />
            }
            userName="Log Out"
            onPress={() => dispatch(signOut())}
          />
        </View>
      </View>

      <AdMobBanner
        bannerSize="mediumRectangle"
        adUnitID={bannerID}
        servePersonalizedAds={true}
        style={{
          alignSelf: "center",
          flexGrow: 1,
          flexShrink: 1,
          justifyContent: "flex-end",
        }}
      />

      <StatusBar style={"inverted"} hidden />
    </SafeAreaView>
  );
}

const styles1 = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "space-between",
  },
  design: {
    backgroundColor: "white",
    elevation: 20,
  },
  design1: {
    marginTop: 20,
    backgroundColor: "white",
    elevation: 20,
    justifyContent: "flex-start",
    shadowColor: "grey",
    shadowOpacity: 1,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 10,
  },
});
export default Account;
