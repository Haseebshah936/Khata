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
import { MaterialIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import color from "../Style/color";

function Client({
  avatar,
  name,
  phoneNo,
  amountToPay,
  onPress,
  renderRightActions,
}) {
  let amountToPay1 = 10000;
  return (
    <Swipeable renderRightActions={renderRightActions} friction={1}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.data}
        onPress={onPress}
      >
        <View
          style={{
            width: 60,
            height: 60,
            backgroundColor: color.secondry,
            borderRadius: 30,
          }}
        >
          <Image
            style={{ borderRadius: 30 }}
            source={{ width: 60, height: 60, uri: avatar }}
          />
        </View>
        <View
          style={[
            styles.textContainer,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 10,
            },
          ]}
        >
          <View>
            <View style={styles.subTextContainer}>
              <Text style={styles.text}>{name} </Text>
              {/* <Text style={styles.toPay}>AmountToPay </Text> */}
            </View>
            <View style={styles.subTextContainer}>
              <Text style={styles.text}>{phoneNo}</Text>
              {/* <Text style={styles.toPay}>{amountToPay1} /-Rs</Text> */}
            </View>
            {/* <Text style={styles.email}> {amountToPay}</Text> */}
          </View>
          <MaterialIcons
            style={{ alignSelf: "center" }}
            name="chevron-right"
            size={24}
            color="black"
          />
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  data: {
    marginLeft: 10,
    flexDirection: "row",
    backgroundColor: "white",
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
