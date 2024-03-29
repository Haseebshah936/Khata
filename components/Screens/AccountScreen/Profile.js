import React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

function Profile({
  image,
  userName,
  listingCount,
  message,
  renderLeftActions,
  renderRightActions,
  iconComponent,
  fontSize = 18,
  fontColor = "black",
  onPress,
  marginTop = 20,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        onPress={onPress}
        underlayColor={"#ffffff"}
        activeOpacity={0.6}
      >
        <View style={[styles.container, { marginTop }]}>
          {image && (
            <Image
              style={styles.profilePic}
              source={{
                width: 150,
                height: 150,
                uri: image,
              }}
            />
          )}
          {iconComponent}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.textContainer}>
              <Text
                style={[styles.username, { fontSize, color: fontColor }]}
                numberOfLines={1}
              >
                {userName}
              </Text>
              <View style={styles.messageContainer}>
                {listingCount && (
                  <Text style={styles.listing} numberOfLines={1}>
                    {listingCount}
                  </Text>
                )}
                {message && (
                  <Text style={styles.listing} numberOfLines={2}>
                    {message}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 5,
    marginLeft: 20,
    alignItems: "center",
    marginBottom: 8,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    paddingLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});

export default Profile;
