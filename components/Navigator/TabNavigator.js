import * as React from "react";
import { Button, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppNavigator from './AppNavigator';
import index from "../TodoFireStore";

// import index from "../TodoRealTime";

const Tab = createBottomTabNavigator();

function DrawerNavigator(props) {
  return (
     <Tab.Navigator>
       <Tab.Screen name="Main" component={AppNavigator} />
       <Tab.Screen name="Todo" component={index}/>
   </Tab.Navigator>
  );
}

export default DrawerNavigator;
