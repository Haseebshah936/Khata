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
      <ImageBackground
        source={require("../../assets/walpaper.jpg")}
        style={styles.wallpaper}
        resizeMode={"cover"}
      />
      <Formik
        initialValues={{ name: "", price: "", description: "" }}
        onSubmit={(values) => login(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <View style={styles.loginContainer}>
              <View style={styles.loginTextContainer}>
                <Text style={styles.loginText}>Add Product To Khata</Text>
              </View>

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
                  style={styles.loginInput}
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
              <TouchableOpacity
                // onPress={() => login()}
                onPress={() => {
                  handleSubmit();
                }}
                style={{
                  backgroundColor: "#ff8800",
                  alignItems: "center",
                  alignSelf: "center",
                  padding: 10,
                  marginBottom: 5,
                  borderRadius: 20,
                  width: "50%",
                }}
                activeOpacity={0.6}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  CREATE
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
      <StatusBar hidden style={"inverted"} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    flex: 1,
  },
  profileContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productContainer: {
    padding: 8,
    flexDirection: "row",
    backgroundColor: "#e9ebf5",
    borderRadius: 20,
    marginRight: "7%",
  },
  wallpaper: {
    width: "100%",
    height: Dimensions.get("window").height / 3,
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
    bottom: "12%",
    elevation: 40,
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 1,
    padding: 20,
  },
  loginTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  loginText: {
    fontSize: 19,
    fontWeight: "bold",
  },
  loginInputContainer: {
    padding: 8,
    flexDirection: "row",
    backgroundColor: "#e9ebf5",
    // marginBottom: 20,
    borderRadius: 20,
  },
  loginInput: {
    flex: 1,
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
