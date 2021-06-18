import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";

function ViewProduct({ route }) {
  const data = route.params;
  console.log(data);
  return (
    <SafeAreaView style={styles.container}>
      <Text>ViewProduct</Text>
      <StatusBar hidden style={"inverted"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
export default ViewProduct;
