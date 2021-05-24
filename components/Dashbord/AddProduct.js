import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";

function AddProduct(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>AddProduct</Text>
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
export default AddProduct;
