import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function RenderRightActionProduct({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View style={styles.container}>
        <MaterialIcons name="done-all" size={30} color="white" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#53d62b",
    padding: 20,
  },
});
export default RenderRightActionProduct;
