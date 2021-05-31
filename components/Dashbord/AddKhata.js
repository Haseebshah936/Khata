import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  Dimensions,
  View,
  TextInput,
  TouchableOpacity,
  LogBox,
  Pressable,
  Keyboard,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../firebase";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import ErrorMessage from "../Login/ErrorMessage";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("User Name"),
  phoneNo: Yup.number().required().label("Phone Number"),
  address: Yup.string().label("Phone Number"),
});

function AddKhata({ navigation }) {
  LogBox.ignoreAllLogs([
    "Setting a timer for a long period of time",
    "Cannot update state",
  ]);
  const [uri, setUri] = useState(
    "https://firebasestorage.googleapis.com/v0/b/todo-64931.appspot.com/o/icon-animation-1.gif?alt=media&token=0a4b467c-53a8-47d1-b4ad-5ece7abed641"
  );
  const login = (values) => {
    console.log(values);
    let id = auth.currentUser.uid;
    // alert(id);
    db.collection(id).doc("0").set({
      userName: values.name,
      phoneNo: values.phoneNo,
      address: values.address,
    });
    // alert("Login Successfull");
    console.log(auth.currentUser);
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
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      {/* <ImageBackground
        source={require("../../assets/walpaper.jpg")}
        style={styles.wallpaper}
        resizeMode={"cover"}
      /> */}
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
        initialValues={{ name: "", phoneNo: "", address: "" }}
        onSubmit={(values) => login(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <View style={styles.loginContainer}>
              {/* <View style={styles.loginTextContainer}>
                <Text style={styles.loginText}>Create New Khata</Text>
              </View> */}
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
                      onChangeText={handleChange("name")}
                      style={styles.loginInput}
                      placeholder={"User Name"}
                      clearButtonMode="always"
                      keyboardType={"default"}
                      onBlur={() => setFieldTouched("name")}
                    />
                  </View>
                  <ErrorMessage
                    error={errors.name}
                    visible={touched.name}
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
                  name="home-outline"
                  size={22}
                  color="black"
                />
                <TextInput
                  onChangeText={handleChange("address")}
                  style={[styles.loginInput,{padding: 0, paddingLeft: 5}]}
                  placeholder={"Address"}
                  clearButtonMode="always"
                  numberOfLines={3}
                  multiline
                  keyboardType={"default"}
                  onBlur={() => setFieldTouched("address")}
                />
              </View>
              <ErrorMessage error={errors.address} visible={touched.address} />
              
            </View>
            <TouchableOpacity
                // onPress={() => login()}
                onPress={() => {
                  handleSubmit();
                }}
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
                }}
                activeOpacity={0.85}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  CREATE
                </Text>
              </TouchableOpacity>
          </>
        )}
      </Formik>
      <View style={[styles.loginTextContainer,{marginTop: '5%'}]}>
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
      <StatusBar hidden style={"inverted"} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
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
  wallpaper: {
    width: "100%",
    height: Dimensions.get("window").height / 3,
  },
  loginTextContainer: {
    flexDirection: "row",
    alignItems: 'center',
    marginLeft: 20,
    margin: 20,
    marginTop: '15%',
    marginBottom: '10%'
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
  welcomeText: {
    fontSize: 26,
    fontWeight: "700",
    color: "white",
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

export default AddKhata;
