import React, { useEffect, useRef } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { loginOffline } from "../redux/Actions";
import LottieView from "lottie-react-native";

function LoadingScreen({ navigation }) {
  const dispatch = useDispatch();
  const animation = useRef();

  useEffect(() => {
    dispatch(loginOffline());
  }, []);
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <LottieView
        ref={animation}
        autoPlay
        loop
        style={{
          width: 150,
          height: 150,
          backgroundColor: "#fff",
        }}
        source={require("../../assets/loader.json")}
        // OR find more Lottie files @ https://lottiefiles.com/featured
        // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
export default LoadingScreen;
