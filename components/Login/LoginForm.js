import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  Pressable,
  Keyboard,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Yup from "yup";
import { FontAwesome } from "@expo/vector-icons";
import { Formik } from "formik";
import ErrorMessage from "./ErrorMessage";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import Constants from "expo-constants";

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
import color from "../Style/color";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

function LoginForm({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const sendResetEmail = (email) => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent");
        // ..
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  };

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
              <Text
                onPress={() => setVisible(!visible)}
                style={{
                  textDecorationLine: "underline",
                  alignSelf: "center",
                  paddingTop: 5,
                  color: color.primary,
                }}
              >
                Forget Password
              </Text>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}
      >
        <Pressable
          style={styl.centeredView2}
          onPress={() => Keyboard.dismiss()}
        >
          <View style={styl.modalView}>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                height: 50,
                marginLeft: 15,
                justifyContent: "center",
                borderColor: color.primary,
              }}
            >
              <TextInput
                style={styl.textStyle}
                onChangeText={(text) => setEmail(text)}
                placeholder={"Email"}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: 15,
              }}
            >
              <TouchableHighlight
                style={{ ...styl.openButton, backgroundColor: color.primary }}
                onPress={() => {
                  setVisible(!visible);
                }}
              >
                <Text style={styl.modalText}>Close</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styl.openButton, backgroundColor: color.primary }}
                onPress={() => {
                  sendResetEmail(email);
                }}
              >
                <Text style={styl.modalText}>Submit</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Pressable>
      </Modal>
      <StatusBar style={"auto"} hidden />
    </Pressable>
  );
}

const styl = StyleSheet.create({
  centeredView2: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  modalView: {
    flex: 1,
    margin: 40,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: "black",
  },
  textStyle1: {
    color: "black",
    marginLeft: 15,
  },
  modalText: {
    color: "white",
    marginLeft: 15,
    marginRight: 15,
  },
});

export default LoginForm;
