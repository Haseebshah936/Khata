import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  Dimensions,
  SafeAreaView,
  Keyboard,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import * as Yup from "yup";
import { Formik } from "formik";
import ErrorMessage from "./ErrorMessage";
import { auth } from "../../firebase";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import styles from "../Style/stylesRegister";

const validationSchema = Yup.object().shape({
  userName: Yup.string().required().label("User Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
  phoneNo: Yup.number().required().label("Phone Number"),
});

function RegisterForm({ navigation }) {
  const [uri, setUri] = useState(
    "https://firebasestorage.googleapis.com/v0/b/todo-64931.appspot.com/o/icon-animation-1.gif?alt=media&token=0a4b467c-53a8-47d1-b4ad-5ece7abed641"
  );
  const register = (values) => {
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        user
          .updateProfile({
            displayName: values.userName,
            photoURL: uri,
          })
          .then(function () {
            // Update successful.
          })
          .catch(function (error) {
            // An error happened.
          });
        navigation.popToTop();
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  };

  const addImage = async () => {
    console.log("Add Image");
    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setUri(result.uri);
    }
  };
  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
      <View style={styles.loginTextTopContainer}>
        <Text style={styles.loginText}>Sign Up</Text>
        <View style={styles.circleContainer}>
          <View style={styles.loginTextTopContainerSmallCircle} />
          <View style={styles.loginTextTopContainerBigCircle} />
        </View>
      </View>
      <View>
        <Formik
          initialValues={{
            userName: "",
            email: "",
            password: "",
            phoneNo: "",
            address: "",
          }}
          onSubmit={(values) => register(values)}
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
                <View style={styles.profileContainer}>
                  <TouchableOpacity
                    style={styles.profilePic}
                    activeOpacity={0.6}
                    onPress={() => addImage()}
                  >
                    <Image
                      resizeMethod={"resize"}
                      source={{
                        width: 120,
                        height: 120,
                        uri: uri,
                      }}
                    />
                  </TouchableOpacity>
                  <View style={{ flex: 0.9 }}>
                    <View style={styles.productContainer}>
                      <Ionicons
                        style={styles.icon}
                        name="person-outline"
                        size={22}
                        color="black"
                      />
                      <TextInput
                        onChangeText={handleChange("userName")}
                        style={styles.loginInput}
                        placeholder={"User Name"}
                        clearButtonMode="always"
                        keyboardType={"default"}
                        onBlur={() => setFieldTouched("userName")}
                      />
                    </View>
                    <ErrorMessage
                      error={errors.userName}
                      visible={touched.userName}
                      size={12}
                    />
                  </View>
                </View>
                <View style={styles.loginInputContainer}>
                  <Ionicons
                    style={styles.icon}
                    name="call-outline"
                    size={22}
                    color="black"
                  />
                  <TextInput
                    onChangeText={handleChange("phoneNo")}
                    style={styles.loginInput}
                    placeholder={"PhoneNumber"}
                    clearButtonMode="always"
                    keyboardType={"phone-pad"}
                    onBlur={() => setFieldTouched("phoneNo")}
                  />
                </View>
                <ErrorMessage
                  error={errors.phoneNo}
                  visible={touched.phoneNo}
                />
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
                  }}
                  style={styles.submitButtonText}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
      <View style={styles.loginTextBottomContainer}>
        <View style={styles.loginTextBottomContainerBigCircle} />
        <View style={styles.loginTextBottomContainerSmallCircle} />
        <Text
          style={[styles.signupText]}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Text>
      </View>
      <StatusBar style={"auto"} hidden />
    </Pressable>
  );
}

export default RegisterForm;
