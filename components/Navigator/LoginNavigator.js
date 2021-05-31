import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginForm from "../Login/LoginForm";
import RegisterForm from "../Login/RegisterForm";
// import index from '../TodoRealTime';
import LoadingScreen from "../Screens/LoadingScreen";
import TabNavigator from "./TabNavigator";
// import index from '../TodoFireStore';

const Stack = createStackNavigator();

function LoginNavigator(props) {
  return (
    <Stack.Navigator headerMode={"none"} mode={"modal"}>
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="Register" component={RegisterForm} />
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
}

export default LoginNavigator;
