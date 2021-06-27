import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../Screens/AccountScreen/Account";
import OfflineSupport from "../Dashbord/OfflineSupport";
import AccountProfile from "../Screens/AccountScreen/AccountProfile";
import color from "../Style/color";

const Stack = createStackNavigator();

function AccountNavigator(props) {
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
        name="Account"
        component={Account}
      />
      <Stack.Screen name="OfflineNote" component={OfflineSupport} />
      <Stack.Screen name="UserProfile" component={AccountProfile} />
    </Stack.Navigator>
  );
}

export default AccountNavigator;
