import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Text,
  Linking,
  TouchableOpacity,
} from "react-native";
import styles from "../Style/styles";
import { Ionicons } from "@expo/vector-icons";
import { android, ios } from "../../APIKeys";
import { AdMobBanner } from "expo-ads-admob";
import { FontAwesome } from "@expo/vector-icons";

function KhataProfile({ route }) {
  const data = route.params;
  const uri = data.uri;
  const phoneNo = data.phoneNo;
  const address = data.address;
  const name = data.userName;
  const hold =
    "https://firebasestorage.googleapis.com/v0/b/todo-64931.appspot.com/o/icon-animation-1.gif?alt=media&token=0a4b467c-53a8-47d1-b4ad-5ece7abed641";
  // console.log(data);
  const bannerID =
    Platform.OS === "ios" ? ios.admobBanner : android.admobBanner;
  const dialCall = (number) => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };
  return (
    <SafeAreaView
      style={[styles.container, { justifyContent: "space-between" }]}
    >
      <View></View>
      <View style={[styles.loginContainer]}>
        <View style={styles.profileContainer}>
          <TouchableWithoutFeedback
            style={styles.profilePic}
            activeOpacity={0.6}
          >
            {uri ? (
              <Image
                style={{ overflow: "hidden", borderRadius: 20 }}
                resizeMethod={"resize"}
                source={{
                  width: 120,
                  height: 120,
                  uri: uri,
                }}
              />
            ) : (
              <Image
                style={{ overflow: "hidden", borderRadius: 20 }}
                resizeMethod={"resize"}
                source={{
                  width: 120,
                  height: 120,
                  uri: hold,
                }}
              />
            )}
          </TouchableWithoutFeedback>
          <View style={{ flex: 0.9 }}>
            <View style={styles.productContainer}>
              <Ionicons
                style={styles.icon}
                name="person-outline"
                size={22}
                color="black"
              />
              <Text style={styles.loginInput}>{name}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => dialCall(phoneNo)}
          style={styles.loginInputContainer}
          activeOpacity={0.6}
        >
          <Ionicons
            style={styles.icon}
            name="call-outline"
            size={22}
            color="black"
          />
          <Text style={styles.loginInput}>{phoneNo}</Text>
        </TouchableOpacity>
        <View
          style={[
            styles.loginInputContainer,
            { marginTop: 20, marginBottom: 15 },
          ]}
        >
          <Ionicons
            style={[styles.icon, { paddingBottom: 5 }]}
            name="bookmark-outline"
            size={22}
            color="black"
          />
          {address === "" || address === null ? (
            <Text style={[styles.loginInput, { paddingLeft: 5 }]}>
              Address Not Provided
            </Text>
          ) : (
            <Text
              style={[styles.loginInput, { paddingBottom: 5, paddingLeft: 5 }]}
            >
              {address}
            </Text>
          )}
        </View>
      </View>
      <View style={{ alignSelf: "center" }}>
        <AdMobBanner
          bannerSize="leaderboard"
          adUnitID={bannerID}
          servePersonalizedAds={true}
          // onDidFailToRfeceiveAdWithError={console.log}
        />
      </View>
      <StatusBar hidden style={"inverted"} />
    </SafeAreaView>
  );
}

// const style = StyleSheet.create({
//   constainer
// })

export default KhataProfile;
