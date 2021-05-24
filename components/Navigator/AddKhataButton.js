import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function AddKhataButton({ onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.addButton}
      onPress={onPress}
    >
      <AntDesign name="pluscircle" size={30} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addButton: {
    // position: 'absolute',
    backgroundColor: "red",
    width: 70,
    height: 70,
    borderRadius: 35,
    bottom: 15,
    borderWidth: 10,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AddKhataButton;
