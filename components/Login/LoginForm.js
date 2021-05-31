import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  Dimensions,
  SafeAreaView,
  Pressable,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import * as Yup from "yup";
import { FontAwesome } from "@expo/vector-icons";
import { Formik } from "formik";
import ErrorMessage from "./ErrorMessage";
import { auth } from "../../firebase";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

function LoginForm({ navigation }) {
  const login = (values) => {
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        navigation.replace("Main");
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage + "Line 42");
      });
  };
  const anonymousSignin = () => {
    auth.signInAnonymously()
      .then(() => {
        // Signed in..
        navigation.replace("Main");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage + "Line 56");
        // ...
      });
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      {/* <Image style={styles.logo} source={require("../../assets/Logo.png")} /> */}
      <View style={styles.loginTextContainer}>
          <Text style={styles.loginText}>Login</Text>
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20, 
            backgroundColor: "#ff8800",
            elevation: 12,
            shadowColor: 'grey',
            shadowOffset:{
              width: 5,
              height: 5
            },
            shadowOpacity: 0.5,
            shadowRadius: 30,
            marginLeft: '50%',
            marginRight: 20
          }}/>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40, 
            backgroundColor: "#ff8800",
            elevation: 30,
            shadowColor: 'grey',
            shadowOffset:{
              width: 5,
              height: 5
            },
            shadowOpacity: 0.5,
            shadowRadius: 30,
          }}/>
      </View>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => login(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
          <View style={styles.loginContainer}>
            <View style={styles.loginInputContainer}>
              <Ionicons
                style={{
                  alignSelf: "center",
                  paddingRight: 5,
                }}
                name="person-outline"
                size={22}
                color="black"
              />
              <TextInput
                onChangeText={handleChange("email")}
                style={styles.loginInput}
                placeholder={"Email"}
                clearButtonMode="always"
                keyboardType={"email-address"}
                onBlur={() => setFieldTouched("email")}
              />
            </View>
            <ErrorMessage error={errors.email} visible={touched.email} />
            <View style={styles.loginInputContainer}>
            <MaterialIcons
                 style={{
                  alignSelf: "center",
                  paddingRight: 5,
                }}
                name="lock"
                size={22}
                color="black"
              />
  
              <TextInput
                onChangeText={handleChange("password")}
                style={styles.loginInput}
                placeholder={"Password"}
                clearButtonMode="always"
                secureTextEntry
                onBlur={() => setFieldTouched("password")}
              />
            </View>
            <ErrorMessage
              error={errors.password}
              visible={touched.password}
            />
          </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#ff8800",
                left: '60%',
                paddingLeft: '10%',
                marginTop: 30,
                borderRadius: 25,
                width: "60%",
                marginBottom: '17%',
                elevation: 5,
                shadowColor: 'grey',
                shadowOffset:{
                  width: 5,
                  height: 5
                },
                shadowOpacity: 0.5,
                shadowRadius: 30,
              }}
              activeOpacity={1}
            >
              <Text onPress={() => {
                handleSubmit();
              }} style={{ color: "white", padding: 12, fontWeight: "bold" }}>
                LOGIN
              </Text>
            </TouchableOpacity>        
        </>
      )}
      </Formik>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.googleLogin}
        activeOpacity={0.6}
        onPress={() => anonymousSignin()}
      >
        <Image
          style={styles.googleLogo}
          source={require("../../assets/googleLogo.png")}
        />
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fbLogin}
        activeOpacity={0.6}
        onPress={() => anonymousSignin()}
      >
        <FontAwesome style={styles.fbLogo} name="facebook" size={18} color="white"/>
        <Text style={styles.fbText}>Sign in with facebook</Text>
      </TouchableOpacity>
      </View>
      <View style={[styles.loginTextContainer,{marginTop: '12%'}]}>
      <View style={{
          width: 80,
          height: 80,
          borderRadius: 40, 
          backgroundColor: "#ff8800",
          elevation: 30,
          shadowColor: 'grey',
          shadowOffset:{
            width: 5,
            height: 5
          },
          shadowOpacity: 0.5,
          shadowRadius: 30,
          left: '-70%'
        }}/>
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20, 
            backgroundColor: "#ff8800",
            elevation: 5,
            shadowColor: 'grey',
            shadowOffset:{
              width: 5,
              height: 5
            },
            shadowOpacity: 0.5,
            shadowRadius: 30,
            right: '50%',
          }}/>
          <Text 
            style={[styles.loginText,{marginLeft: '29%'}]}
            onPress={() => navigation.navigate("Register")}
          >Sign Up</Text>
      </View>
      <StatusBar style={"auto"} hidden/>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
  },
  logo: {
    marginTop: Constants.statusBarHeight,
    width: 200,
    height: 120,
    marginBottom: 30,
    marginLeft: 50,
  },
  searchBar: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 30,
    padding: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  searchBarText: {
    fontWeight: "bold",
    color: "black",
    fontSize: 16,
  },
  CovidLog: {
    borderRadius: 15,
    justifyContent: "center",
    position: "absolute",
    left: 15,
    alignSelf: "center",
    width: 40,
    flex: 0.5,
  },
  countriesData: {
    marginBottom: 15,
  },
  loginText: {
    padding: 10,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#474747",
  },
  loginContainer: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "white",
    elevation: 20,
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 1,
    padding: 20,
  },
  loginInputContainer: {
    flexDirection: "row",
    borderColor: "#ff8800",
    borderBottomWidth: 1
  },
  loginInput: {
    flex: 1,
    padding: 5
  },
  loginTextContainer: {
    flexDirection: "row",
    alignItems: 'center',
    marginLeft: 20,
    margin: 20,
    marginTop: '20%',
    marginBottom: '25%'
  },
  loginText: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 5,
    fontFamily: "monospace"
  },
  login: {
    marginTop: 5,
    marginVertical: 10,
    backgroundColor: "pink",
    borderRadius: 50,
    width: Dimensions.get("window").width * 0.3,
    marginBottom: 30,
    marginRight: 20,
  },

  buttonContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLogin: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    borderRadius: 50,
    elevation: 5,
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 30,
    shadowOffset:{
      width: 5,
      height: 5
    }
  },
  fbLogin: {
    flexDirection: "row",
    backgroundColor: "#326ba8",
    justifyContent: "space-between",
    borderRadius: 50,
    marginLeft: 20,
    elevation: 5,
    shadowColor: 'grey',
    shadowOffset:{
      width: 5,
      height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  googleLogo: {
    width: 25,
    height: 25,
    alignSelf: "center",
    marginLeft: 15,
  },
  fbLogo: {
    alignSelf: "center",
    marginLeft: 15,
  },
  googleText: {
    padding: 12,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 10,
    color: "#474747",
  },
  fbText: {
    padding: 13,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 10,
    color: "white",
  },
});
export default LoginForm;
