import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Style/styles";
import { Ionicons } from "@expo/vector-icons";
import { addOfflineNote, deleteOfflineNote } from "../redux/Actions";
import color from "../Style/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import RenderRightAction from "./RenderRightAction";

function OfflineSupport(props) {
  const state = useSelector((state) => state.Reducer);
  const offlineNote = state.offlineNote;
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  useEffect(() => {}, [offlineNote]);
  return (
    <View style={styles.container}>
      <View style={[styles.loginInputContainer, { margin: 10 }]}>
        <Ionicons
          style={styles.icon}
          name="bookmark-outline"
          size={22}
          color="black"
        />
        <TextInput
          onChangeText={(text) => setDescription(text)}
          style={[styles.loginInput, { padding: 0, paddingLeft: 5 }]}
          placeholder={"Description"}
          clearButtonMode="always"
          numberOfLines={3}
          multiline
          keyboardType={"default"}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => dispatch(addOfflineNote(description))}
        style={{
          borderRadius: 20,
          backgroundColor: color.primary,
          alignSelf: "center",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            padding: 20,
            paddingTop: 5,
            paddingBottom: 5,
            color: "white",
            fontWeight: "bold",
          }}
        >
          Add
        </Text>
      </TouchableOpacity>
      <FlatList
        style={{
          borderTopWidth: 2,
          borderColor: color.primary,
          flex: 1,
          marginBottom: 10,
        }}
        data={offlineNote}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              borderBottomWidth: 0.5,
              borderRadius: 20,
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                padding: 20,
                paddingBottom: 5,
                flexGrow: 1,
                flexShrink: 1,
              }}
            >
              {item.description}
            </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                Alert.alert(
                  "Confirmation",
                  "Are you sure you want to delete this note",
                  [
                    {
                      text: "Yes",
                      onPress: () => dispatch(deleteOfflineNote(item.id)),
                    },
                    {
                      text: "No",
                    },
                  ]
                );
              }}
              style={{ alignSelf: "center", marginRight: 20 }}
            >
              <MaterialCommunityIcons
                name="trash-can"
                size={28}
                color={color.secondry}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      <StatusBar hidden style={"inverted"} />
    </View>
  );
}

export default OfflineSupport;
