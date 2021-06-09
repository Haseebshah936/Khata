import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Fontisto } from "@expo/vector-icons";

function RenderRightAction({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View style={styles.container}>
        <Fontisto name="trash" size={24} color="white" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    padding: 20,
  },
});
export default RenderRightAction;
