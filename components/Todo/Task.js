import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

function Task({ todo, avatar, description, renderRightActions }) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.data}>
        {avatar && <Image
          style={{ borderRadius: 30 }}
          source={{ width: 60, height: 60, uri: avatar }}
        />}
        <View style={styles.textContainer}>
          <View style={styles.subTextContainer}>
            <Text style={styles.text}>{todo} </Text>
          </View>
          {description && <Text style={styles.email}> {description}</Text>}
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    padding: 10,
    alignItems: "center",
    position: "absolute",
  },
  data: {
    marginLeft: 10,
    flexDirection: "row",
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
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    marginTop: 2,
  },
});
export default Task;
