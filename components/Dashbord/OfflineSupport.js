import React from "react";
import { View, StyleSheet, Text } from "react-native";
import stylesRegister from "../Style/stylesRegister";

function OfflineSupport(props) {
  return (
    <View style={styles.container}>
      <Text>OfflineSupport</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OfflineSupport;
