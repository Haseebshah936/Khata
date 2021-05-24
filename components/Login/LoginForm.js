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
      <Image style={styles.logo} source={require("../../assets/Logo.png")} />

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => login(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <View style={styles.searchBar}>
              <Fontisto
                style={styles.CovidLog}
                name="email"
                size={20}
                color="black"
              />
              <View style={{ marginLeft: 45, marginRight: 10 }}>
                <TextInput
                  onChangeText={handleChange("email")}
                  placeholder={"Email"}
                  style={styles.searchBarText}
                  clearButtonMode="always"
                  keyboardType={"email-address"}
                  onBlur={() => setFieldTouched("email")}
                />
              </View>
            </View>
            <ErrorMessage error={errors.email} visible={touched.email} />
            <View style={styles.searchBar}>
              <MaterialIcons
                style={styles.CovidLog}
                name="lock"
                size={20}
                color="black"
              />
              <View style={{ marginLeft: 45, marginRight: 10 }}>
                <TextInput
                  onChangeText={handleChange("password")}
                  placeholder={"Password"}
                  style={styles.searchBarText}
                  clearButtonMode="always"
                  secureTextEntry
                  onBlur={() => setFieldTouched("password")}
                />
              </View>
            </View>
            <ErrorMessage error={errors.password} visible={touched.email} />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.login}
                activeOpacity={0.6}
                onPress={handleSubmit}
              >
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.login}
                activeOpacity={0.6}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.loginText}>Register</Text>
              </TouchableOpacity>
            </View>
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
        <FontAwesome
     
              style={styles.fbLogo}
 
                  name="facebook"
   
                size={18}
     
              color="white"
       
        />
        <Text style={styles.fbText}>Sign in with facebook</Text>
      </TouchableOpacity>
      </View>

      <StatusBar style={"auto"} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "lightyellow",
    justifyContent: "center",
    width: "100%",
    height: "100%",
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
    // height: 30,
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
  },
  fbLogin: {
    flexDirection: "row",
    backgroundColor: "#326ba8",
    justifyContent: "space-between",
    borderRadius: 50,
    marginLeft: 20,
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
    padding: 12,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 10,
    color: "white",
  },
});
export default LoginForm;
