import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginNavigator from './components/Navigator/LoginNavigator';
import { LogBox } from 'react-native';
import UserData from './components/Dashbord/UserData';
import Check from "./components/Login/Check";

export default function App() {
  // LogBox.ignoreAllLogs(["Setting a timer for a long period of time"])
  return (
    <NavigationContainer>
      <LoginNavigator />
    </NavigationContainer>
    // <Check />
    // <UserData/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
