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
    backgroundColor: "#ff8800",
    width: 76,
    height: 76,
    borderRadius: 40,
    bottom: 22,
    borderWidth: 8,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AddKhataButton;
