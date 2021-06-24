import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Image, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Text } from "react-native";
import styles from "../Style/styles";
import { Ionicons } from "@expo/vector-icons";
import { android, ios } from "../../APIKeys";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";


function ViewProduct({ route }) {
  const data = route.params;
  const uri = data.uri;
  const price = data.price;
  const description = data.description;
  const name = data.productName
  const status = data.status;
  const hold =
    "https://firebasestorage.googleapis.com/v0/b/todo-64931.appspot.com/o/icon-animation-1.gif?alt=media&token=0a4b467c-53a8-47d1-b4ad-5ece7abed641";
  console.log(data);
  const bannerID =
    Platform.OS === "ios" ? ios.admobBanner : android.admobBanner;
  return (
    <SafeAreaView style={[styles.container, {justifyContent: 'space-between'}]}>
        <View style={[styles.loginContainer, {marginTop: '20%'}]}>
                <View style={styles.profileContainer}>
                  <TouchableWithoutFeedback
                    style={styles.profilePic}
                    activeOpacity={0.6}
                  >
                    {uri ? (
                      <Image
                        resizeMethod={"resize"}
                        source={{
                          width: 120,
                          height: 120,
                          uri: uri,
                        }}
                      />
                    ) : (
                      <Image
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
                        name="cart-outline"
                        size={22}
                        color="black"
                      />
                      <Text style={styles.loginInput}>{name}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.loginInputContainer}>
                  <Ionicons
                    style={styles.icon}
                    name="card-outline"
                    size={22}
                    color="black"
                  />
                  <Text
                    style={styles.loginInput}
                  >
                    {price}
                  </Text>
                </View>
                <View style={[styles.loginInputContainer, {marginTop: 20}]}>
                  <Ionicons
                    style={[styles.icon, {paddingBottom: 5}]}
                    name="bookmark-outline"
                    size={22}
                    color="black"
                  />
                  {
                    description === "" ? (
                      <Text
                        style={[styles.loginInput, {paddingLeft: 5, paddingBottom: 5}]}
                      >
                        Description not Provided
                      </Text>
                    ):
                    (
                      <Text
                        style={[styles.loginInput, { paddingBottom: 5, paddingLeft: 5 }]}
                      >
                        {description}
                      </Text>
                    )
                  }
                </View>
                <View style={[styles.loginInputContainer, {marginTop: 20, marginBottom: 15}]}>
                  <Ionicons
                    style={[styles.icon, {paddingBottom: 5}]}
                    name="bookmark-outline"
                    size={22}
                    color="black"
                  />
                  {
                    status ? (
                      <Text
                        style={[styles.loginInput, {paddingLeft: 5, paddingBottom: 5}]}
                      >
                        Paid
                      </Text>
                    ):
                    (
                      <Text
                        style={[styles.loginInput, { paddingBottom: 5, paddingLeft: 5 }]}
                      >
                        Not-Paid
                      </Text>
                    )
                  }
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

export default ViewProduct;
