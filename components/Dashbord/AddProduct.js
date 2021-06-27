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
import styles from "../Style/stylesRegister";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
import { android, ios } from "../../APIKeys";
import { addKhataImage, addProduct } from "../redux/Actions";
import { useDispatch, useSelector } from "react-redux";

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
  const bannerID =
    Platform.OS === "ios" ? ios.admobBanner : android.admobBanner;
  const store = useSelector((state) => state);
  const uri = store.Reducer.khataImage;
  const hold =
    "https://firebasestorage.googleapis.com/v0/b/todo-64931.appspot.com/o/icon-animation-1.gif?alt=media&token=0a4b467c-53a8-47d1-b4ad-5ece7abed641";

  const dispatch = useDispatch();
  // const login = (values) => {
  //   console.log(values);
  //   let id = auth.currentUser.uid;
  //   db.collection(id).doc(0).set({
  //     userName: values.name,
  //     price: values.price,
  //     description: values.description,
  //   });
  //   alert("Login Successfull");
  //   navigation.replace("Data");
  //   console.log(auth.currentUser);
  // };
  // const addImage = async () => {
  //   // console.log("Add Image");
  //   // let result = await ImagePicker.launchImageLibraryAsync();
  //   let result = await ImagePicker.launchCameraAsync({ quality: 0.2 });
  //   if (!result.cancelled) {
  //     setUri(result.uri);
  //   }
  // };

  return (
    <Pressable
      onPress={Keyboard.dismiss}
      style={[styles.container, { justifyContent: "space-between" }]}
    >
      {/* <View style={styles.loginTextTopContainer}>
        <Text style={styles.loginText}>Add Product</Text>
        <View style={[styles.circleContainer, { left: 30 }]}>
          <View style={styles.loginTextTopContainerSmallCircle} />
          <View style={styles.loginTextTopContainerBigCircle} />
        </View>
      </View> */}
      <View></View>
      <View>
        <Formik
          initialValues={{ name: "", price: "", description: "" }}
          onSubmit={(values) => {
            dispatch(
              addProduct(values.name, values.price, values.description, uri)
            );
          }}
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
              <View style={[styles.loginContainer]}>
                <View style={styles.profileContainer}>
                  <TouchableOpacity
                    style={styles.profilePic}
                    activeOpacity={0.6}
                    onPress={() => dispatch(addKhataImage())}
                  >
                    {uri ? (
                      <Image
                        resizeMethod={"resize"}
                        style={{ overflow: "hidden", borderRadius: 20 }}
                        source={{
                          width: 120,
                          height: 120,
                          uri: uri,
                        }}
                      />
                    ) : (
                      <Image
                        resizeMethod={"resize"}
                        style={{ overflow: "hidden", borderRadius: 20 }}
                        source={{
                          width: 120,
                          height: 120,
                          uri: hold,
                        }}
                      />
                    )}
                  </TouchableOpacity>
                  <View style={{ flex: 0.9 }}>
                    <View style={styles.productContainer}>
                      <Ionicons
                        style={styles.icon}
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
                    style={styles.icon}
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
                    style={styles.icon}
                    name="bookmark-outline"
                    size={22}
                    color="black"
                  />
                  <TextInput
                    onChangeText={handleChange("description")}
                    style={[styles.loginInput, { padding: 0, paddingLeft: 5 }]}
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
                style={styles.submitButton}
                activeOpacity={0.85}
              >
                <Text style={styles.submitButtonText}>CREATE</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
      <View style={{ alignSelf: "center" }}>
        <AdMobBanner
          bannerSize="leaderboard"
          adUnitID={bannerID}
          servePersonalizedAds={true}
          // onDidFailToRfeceiveAdWithError={console.log}
        />
      </View>
      <StatusBar hidden style={"inverted"} />
    </Pressable>
  );
}

export default AddProduct;
