import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from '../Login/LoginForm';
import RegisterForm from '../Login/RegisterForm';
// import index from '../TodoRealTime';
import index from '../TodoFireStore';
import UserData from '../Dashbord/UserData';
// import index from '../TodoFireStore';

const Stack = createStackNavigator();

function AppNavigator(props) {
  return (
    <Stack.Navigator headerMode={'none'} mode={'modal'}>
      <Stack.Screen name="Main" component={UserData}/>
      <Stack.Screen name="Todo" component={index}/>
    </Stack.Navigator>
  );
}

export default AppNavigator;