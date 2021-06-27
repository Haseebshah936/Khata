import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginForm from "../Login/LoginForm";
import RegisterForm from "../Login/RegisterForm";
// import index from '../TodoRealTime';
import index from "../TodoFireStore";
import UserData from "../Dashbord/UserData";
import ThingsBought from "../Dashbord/ThingsBought";
import ViewProduct from "../Dashbord/ViewProduct";
import AddProduct from "../Dashbord/AddProduct";
import KhataProfile from "../Dashbord/KhataProfile";
import color from "../Style/color";
// import index from '../TodoFireStore';

const Stack = createStackNavigator();

function AppNavigator(props) {
  return (
    <Stack.Navigator
      mode={"modal"}
      screenOptions={{
        headerStyle: {
          backgroundColor: color.primary,
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Main"
        component={UserData}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ThingsBought"
        component={ThingsBought}
      />
      <Stack.Screen name="ViewProduct" component={ViewProduct} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="KhataProfile" component={KhataProfile} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
