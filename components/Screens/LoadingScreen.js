import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { loginOffline } from "../redux/Actions";
function LoadingScreen({ navigation }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        navigation.replace("Main");
        // ...
      } else {
        // User is signed out
        // ...
        navigation.replace("Login");
      }
    });
    dispatch(loginOffline());
    return subscribe;
  }, []);
  return (
    <View>
      <ActivityIndicator
        style={{ justifyContent: "center", alignItems: "center" }}
        size={"large"}
        color={"black"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
export default LoadingScreen;
