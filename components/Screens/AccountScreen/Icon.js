import React from "react";
import { View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

function Icon({
  iconName,
  iconSize,
  iconColor = "white",
  backgroundColor = "black",
}) {
  return (
    <View
      style={{
        borderRadius: iconSize * 0.85,
        alignItems: "center",
        justifyContent: "center",
        width: iconSize * 1.7,
        height: iconSize * 1.7,
        backgroundColor,
      }}
    >
      <MaterialCommunityIcons
        name={iconName}
        size={iconSize}
        color={iconColor}
      />
    </View>
  );
}

export default Icon;
