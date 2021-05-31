import React, {useState} from "react";
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
        // ...
        navigation.popToTop()
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        // ..
      });
    };
    
    const addImage = async () => {
      console.log("Add Image");
      // let result = await ImagePicker.launchImageLibraryAsync();
      let result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        setUri(result.uri);
      }
    };
    return (
      <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
      <View style={styles.loginTextContainer}>
          <Text style={styles.loginText}>Create Khata</Text>
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20, 
            backgroundColor: "#ff8800",
            elevation: 10,
            shadowColor: 'grey',
            shadowOffset:{
              width: 5,
              height: 5
            },
            shadowOpacity: 0.5,
            shadowRadius: 30,
            marginLeft: '16%',
            marginRight: 20
          }}/>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40, 
            backgroundColor: "#ff8800",
            elevation: 40,
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
        initialValues={{ userName: "", email: "", password: "", phoneNo: "", address: "" }}
        onSubmit={(values) => register(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
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
                <View style={{flex: 1 }}>
                  <View style={styles.productContainer}>
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
                  style={{
                    alignSelf: "center",
                    paddingRight: 5,
                  }}
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
              <ErrorMessage error={errors.phoneNo} visible={touched.phoneNo} />
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
                // onPress={() => login()}
                
                style={{
                  backgroundColor: "#ff8800",
                  left: '60%',
                  padding: 12,
                  paddingLeft: '12%',
                  marginTop: 30,
                  borderRadius: 25,
                  width: "60%",
                  elevation: 5,
                  shadowColor: 'grey',
                  shadowOffset:{
                    width: 5,
                    height: 5
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 30,
                  marginBottom: '4%'
                }}
                activeOpacity={1}
              >
                <Text onPress={() => {
                    handleSubmit();
                  }} 
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
          </>
        )}
      </Formik>
      <Text
        style={{ textDecorationLine: "underline", alignSelf: 'center' }}
        onPress={() => navigation.navigate("Login")}
      >
          Go To Login
      </Text>
      <View style={[styles.loginTextContainer,{marginTop: "1%"}]}>
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
          left: '-75%'
        }}/>
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20, 
            backgroundColor: "#ff8800",
            elevation: 10,
            shadowColor: 'grey',
            shadowOffset:{
              width: 5,
              height: 5
            },
            shadowOpacity: 0.5,
            shadowRadius: 30,
            right: '50%',
          }}/>
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
  searchBar: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 30,
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  searchBarText: {
    fontWeight: "bold",
    color: "black",
    fontSize: 16,
  },
  profileContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productContainer: {
    flexDirection: "row",
    borderColor: "#ff8800",
    borderBottomWidth: 1
  },
  loginTextContainer: {
    flexDirection: "row",
    alignItems: 'center',
    marginLeft: 20,
    margin: 20,
    marginTop: '12%',
    marginBottom: '7%'
  },
  loginText: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 5,
    fontFamily: "monospace"
  },
  textContainer: {
    position: "absolute",
    padding: 20,
    marginTop: 20,
  },
  text: {
    fontSize: 12,
    color: "white",
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
  profilePic: {
    alignSelf: "center",
    borderRadius: 20,
    width: 120,
    height: 120,
    overflow: "hidden",
    marginBottom: 20,
  },
});
export default RegisterForm;
