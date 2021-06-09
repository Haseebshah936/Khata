import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginNavigator from "./components/Navigator/LoginNavigator";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import Store from "./components/redux/Store";

export default function App() {
  LogBox.ignoreLogs(["Setting a timer"]);
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <LoginNavigator />
      </NavigationContainer>
    </Provider>
    // <Check />
    // <UserData/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
