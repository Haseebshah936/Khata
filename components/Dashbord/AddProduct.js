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
import Constants from 'expo-constants'
import ErrorMessage from "../Login/ErrorMessage";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Product Name"),
  price: Yup.number().required().label("Price"),
  description: Yup.string().label("Description"),
});

function AddProduct({ navigation }) {
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
    db.collection(id).doc(0).set({
      userName: values.name,
      price: values.price,
      description: values.description,
    });
    alert("Login Successfull");
    navigation.replace("Data");
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
          <Text style={styles.loginText}>Add To Khata</Text>
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
        initialValues={{ name: "", price: "", description: "" }}
        onSubmit={(values) => login(values)}
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
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                      name="cart-outline"
                      size={22}
                      color="black"
                    />
                    <TextInput
                      onChangeText={handleChange("name")}
                      style={styles.loginInput}
                      placeholder={"Product Name"}
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
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                  name="card-outline"
                  size={22}
                  color="black"
                />
                <TextInput
                  onChangeText={handleChange("price")}
                  style={styles.loginInput}
                  placeholder={"Price"}
                  clearButtonMode="always"
                  keyboardType={"numeric"}
                  onBlur={() => setFieldTouched("price")}
                />
              </View>
              <ErrorMessage error={errors.price} visible={touched.price} />
              <View style={styles.loginInputContainer}>
                <Ionicons
                  style={{
                    alignSelf: "center",
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                  name="bookmark-outline"
                  size={22}
                  color="black"
                />
                <TextInput
                  onChangeText={handleChange("description")}
                  style={[styles.loginInput,{padding: 0, paddingLeft: 5}]}
                  placeholder={"Description"}
                  clearButtonMode="always"
                  numberOfLines={3}
                  multiline
                  keyboardType={"default"}
                  onBlur={() => setFieldTouched("description")}
                />
              </View>
              <ErrorMessage
                error={errors.description}
                visible={touched.description}
              />
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


export default AddProduct;
