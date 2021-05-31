import React from "react";
import { Text } from "react-native";

function ErrorMessage({ error, visible, size }) {
  if (!visible || !error) {
    return <Text style={{ color: "red", padding: 0 }}></Text>;
  }
  return (
    <Text style={{ color: "red", padding: 2, fontSize: size }}>{error}</Text>
  );
}

export default ErrorMessage;
