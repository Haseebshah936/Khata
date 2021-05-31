import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { auth } from "../../firebase";

function Account({ navigation }) {
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        // An error happened.
      });

    // AsyncStorage.setItem("Todo", JSON.stringify([])).then(() =>
    //   console.log(value + "After Signout")
    // );
  };
  return (
    <View>
      <Button title={"SignOut"} onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({});

export default Account;
