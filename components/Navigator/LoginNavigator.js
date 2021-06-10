import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginForm from "../Login/LoginForm";
import RegisterForm from "../Login/RegisterForm";
// import index from '../TodoRealTime';
import LoadingScreen from "../Screens/LoadingScreen";
import TabNavigator from "./TabNavigator";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure } from "../redux/Actions";
import SigninNavigator from "./SigninNavigator";
// import index from '../TodoFireStore';

const Stack = createStackNavigator();

function LoginNavigator(props) {
  const store = useSelector((state) => state);
  const loading = store.Reducer.loading;
  const signin = store.Reducer.signin;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(store)
  //   dispatch(loginFailure());
  //   console.log
  // });
  return (
    <Stack.Navigator headerMode={"none"} mode={"modal"}>
      {loading ? (
        <Stack.Screen name="Loading" component={LoadingScreen} />
      ) : signin ? (
        <Stack.Screen name="Main" component={TabNavigator} />
      ) : (
        <Stack.Screen name="Login" component={SigninNavigator} />
      )}
    </Stack.Navigator>
  );
}

export default LoginNavigator;
