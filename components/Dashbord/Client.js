import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

function Client({ avatar, name, phoneNo, amountToPay, onPress}) {
    let amountToPay1 = 10000
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.data} onPress={onPress}>
      <Image
        style={{ borderRadius: 30 }}
        source={{ width: 60, height: 60, uri: avatar }}
      />
      <View style={styles.textContainer}>
        <View style={styles.subTextContainer}>
          <Text style={styles.text}>{name} </Text>
          <Text style={styles.toPay}>AmountToPay </Text>
        </View>
        <View style={styles.subTextContainer}>
          <Text style={styles.text}>03324298364</Text>
          <Text style={styles.toPay}>{amountToPay1} /-Rs</Text>
        </View>
        {/* <Text style={styles.email}> {amountToPay}</Text> */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  data: {
    marginLeft: 10,
    flexDirection: "row",
    backgroundColor: 'white'
  },
  textContainer: {
    alignSelf: "center",
    marginLeft: 10,
    flex: 1,
    height: 60,
    borderBottomWidth: 0.5,
    alignContent: "center",
  },
  subTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  toPay: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  email: {
    fontSize: 16,
    marginTop: 2,
  },
});

export default Client;
