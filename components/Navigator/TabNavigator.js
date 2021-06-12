import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppNavigator from "./AppNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddKhataButton from "./AddKhataButton";
import AddKhata from "../Dashbord/AddKhata";
import AccountNavigator from "./AccountNavigator";

// import index from "../TodoRealTime";

const Tab = createBottomTabNavigator();

function DrawerNavigator(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
        name="Main"
        component={AppNavigator}
      />
      <Tab.Screen
        options={({ navigation }) => ({
          tabBarButton: () => (
            <AddKhataButton onPress={() => navigation.navigate("New Khata")} />
          ),
        })}
        name="New Khata"
        component={AddKhata}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
        name="Account"
        component={AccountNavigator}
      />
    </Tab.Navigator>
  );
}

export default DrawerNavigator;
