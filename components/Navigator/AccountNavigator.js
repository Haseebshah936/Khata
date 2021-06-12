import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../Screens/AccountScreen/Account";
import OfflineSupport from "../Dashbord/OfflineSupport";

const Stack = createStackNavigator();

function AccountNavigator(props) {
  return (
    <Stack.Navigator headerMode={"none"} mode={"modal"}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="OfflineNote" component={OfflineSupport} />
    </Stack.Navigator>
  );
}

export default AccountNavigator;
