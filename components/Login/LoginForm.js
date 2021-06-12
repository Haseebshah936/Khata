import React, { useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  Pressable,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import * as Yup from "yup";
import { FontAwesome } from "@expo/vector-icons";
import { Formik } from "formik";
import ErrorMessage from "./ErrorMessage";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

import { auth, fbAuthProvider, googleAuthProvider } from "../../firebase";
import { Ionicons } from "@expo/vector-icons";
import styles from "../Style/styles";
import {
  androidClientIdGoogle,
  appIdFb,
  iosClientIdGoogle,
} from "../../APIKeys";
import {
  loginWithEmail,
  loginWithFacebook,
  loginWithGoogle,
} from "../redux/Actions";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

function LoginForm({ navigation }) {
  const dispatch = useDispatch();
  // const login = (values) => {
  //   auth
  //     .signInWithEmailAndPassword(values.email, values.password)
  //     .then((userCredential) => {
  //       // Signed in
  //       var user = userCredential.user;
  //       navigation.replace("Main");
  //       // ...
  //     })
  //     .catch((error) => {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       alert(errorMessage + "Line 42");
  //     });
  // };
  // const anonymousSignin = () => {
  //   auth
  //     .signInAnonymously()
  //     .then(() => {
  //       // Signed in..
  //       navigation.replace("Main");
  //     })
  //     .catch((error) => {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       alert(errorMessage + "Line 56");
  //       // ...
  //     });
  // };

  // const loginWithFacebook = async () => {
  //   try {
  //     await Facebook.initializeAsync({
  //       appId: appIdFb,
  //     });
  //     const { type, token, expirationDate, permissions, declinedPermissions } =
  //       await Facebook.logInWithReadPermissionsAsync({
  //         permissions: ["public_profile"],
  //       });

  //     if (type === "success") {
  //       // Build Firebase credential with the Facebook access token.
  //       const credential = fbAuthProvider.credential(token);

  //       // Sign in with credential from the Facebook user.
  //       auth.signInWithCredential(credential).catch(console.log); // Handle Errors here.
  //     } else {
  //       alert("Facebook App not installed");
  //     }
  //   } catch ({ message }) {
  //     alert(`Facebook Login Error: ${message}`);
  //   }
  // };

  // const loginWithGoogle = async () => {
  //   try {
  //     const result = await Google.logInAsync({
  //       androidClientId: androidClientIdGoogle,
  //       iosClientId: iosClientIdGoogle,
  //       behavior: "web",
  //       scopes: ["profile", "email"],
  //     });

  //     if (result.type === "success") {
  //       const credential = googleAuthProvider.credential(
  //         result.idToken,
  //         result.accessToken
  //       );
  //       auth.signInWithCredential(credential).catch(console.log);
  //     } else {
  //       alert("Google Login Cancelled");
  //     }
  //   } catch (e) {
  //     alert(`Google Login Error: ${e}`);
  //   }
  // };

  // useEffect(() => {
  //   const unsub = auth.onAuthStateChanged((user) => {
  //     if (user != null) {
  //       console.log("We are authenticated now!");
  //       console.log(user);
  //       navigation.replace("Main");
  //     }
  //   });
  //   return unsub;
  // });

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <View style={styles.loginTextTopContainer}>
        <Text style={styles.loginText}>Login</Text>
        <View style={styles.circleContainer}>
          <View style={styles.loginTextTopContainerSmallCircle} />
          <View style={styles.loginTextTopContainerBigCircle} />
        </View>
      </View>
      <View>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) =>
            dispatch(loginWithEmail(values.email, values.password))
          }
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleSubmit,
            errors,
            setFieldTouched,
            touched,
          }) => (
            <>
              <View style={styles.loginContainer}>
                <View style={styles.loginInputContainer}>
                  <Ionicons
                    style={styles.icon}
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
                    style={styles.icon}
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
              <TouchableOpacity style={styles.submitButton} activeOpacity={1}>
                <Text
                  onPress={() => {
                    handleSubmit();
                    Keyboard.dismiss();
                  }}
                  style={styles.submitButtonText}
                >
                  LOGIN
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.googleLogin}
          activeOpacity={0.6}
          onPress={() => dispatch(loginWithGoogle())}
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
          onPress={() => dispatch(loginWithFacebook())}
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
      <View style={[styles.loginTextBottomContainer]}>
        <View style={styles.loginTextBottomContainerBigCircle} />
        <View style={styles.loginTextBottomContainerSmallCircle} />
        <Text
          style={[styles.signupText]}
          onPress={() => navigation.navigate("Register")}
        >
          Sign Up
        </Text>
      </View>
      <StatusBar style={"auto"} hidden />
    </Pressable>
  );
}

export default LoginForm;
