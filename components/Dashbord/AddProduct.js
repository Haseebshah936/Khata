import React, { useEffect, useRef, useState } from "react";
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
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../firebase";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import ErrorMessage from "../Login/ErrorMessage";
import NetInfo from "@react-native-community/netinfo";
import styles from "../Style/stylesRegister";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
import { android, ios } from "../../APIKeys";
import {
  addKhataImage,
  addProduct,
  check,
  setIsLoading,
  setRouting,
} from "../redux/Actions";
import LottieView from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import color from "../Style/color";

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
  // let isLoading = store.Reducer.isLoading;
  const [isLoading, setIsLoading] = useState(false);
  let count = store.Reducer.count;
  let routing = store.Reducer.routing;
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDiscription] = useState("");
  const animation = useRef();
  const submit = () => {
    NetInfo.fetch().then((status) => {
      if (status.isInternetReachable) {
        // dispatch(setIsLoading(true));
        dispatch(addProduct(productName, price, description, uri));
      } else {
        setIsLoading(false);
        Alert.alert(
          "Internet not Connected",
          "You are not connected to the internet. You can view data and add data in offline notes. Which you can add later once you are connected.",
          [
            {
              text: "OK",
            },
            {
              text: "Go to offline notes",
              onPress: () => navigation.navigate("Account"),
            },
          ]
        );
      }
    });
  };
  const loader = async () => {
    if (productName !== "" && price !== "") {
      setIsLoading(true);
      console.log("i am in+");
    }
  };
  const [firstTime, setFirstTime] = useState(false);
  useEffect(() => {
    // animation.current.play();
    // console.log("loaded");
    if (!firstTime) {
      console.log("i am in3");
      setIsLoading(false);
      setFirstTime(true);
    }
    if (routing) {
      navigation.pop();
      console.log("i am in2");
      setIsLoading(false);
      dispatch(setRouting(false));
    }
  }, [count]);

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
      {isLoading ? (
        // <View style={{ justifyContent: "center", alignItems: "center" }}>
        //   <LottieView
        //     ref={animation}
        //     autoPlay
        //     loop
        //     style={{
        //       width: 150,
        //       height: 150,
        //       backgroundColor: "#fff",
        //     }}
        //     source={require("../../assets/loader.json")}
        //     // OR find more Lottie files @ https://lottiefiles.com/featured
        //     // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        //   />
        // </View>
        <ActivityIndicator
          size={"large"}
          color={color.primary}
          style={{ alignItems: "center", justifyContent: "center" }}
        />
      ) : (
        // <ActivityIndicator
        //   size={"large"}
        //   color={color.primary}
        //   style={{ justifyContent: "center", alignSelf: "center" }}
        // />
        <View>
          {/* <Formik
            initialValues={{ name: "", price: "", description: "" }}
            onSubmit={(values) => {
              {
                setIsLoading(true);
                if (true) {
                  // dispatch(setIsLoading(true));
                  dispatch(
                    addProduct(
                      values.name,
                      values.price,
                      values.description,
                      uri
                    )
                  );
                } else {
                  Alert.alert(
                    "Internet not Connected",
                    "You are not connected to the internet. You can view data and add data in offline notes. Which you can add later once you are connected.",
                    [
                      {
                        text: "OK",
                      },
                      {
                        text: "Go to offline notes",
                        onPress: () => navigation.navigate("Account"),
                      },
                    ]
                  );
                }
              }
            }}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              setFieldTouched,
              touched,
            }) => ( */}
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
                      // onChangeText={handleChange("name")}
                      onChangeText={(text) => setProductName(text)}
                      style={styles.loginInput}
                      placeholder={"Product Name"}
                      clearButtonMode="always"
                      keyboardType={"default"}
                      // onBlur={() => setFieldTouched("name")}
                    />
                  </View>
                  {/* <ErrorMessage
                    error={errors.name}
                    visible={touched.name}
                    size={12}
                  /> */}
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
                  onChangeText={(text) => setPrice(text)}
                  // onChangeText={handleChange("price")}
                  style={styles.loginInput}
                  placeholder={"Price"}
                  clearButtonMode="always"
                  keyboardType={"numeric"}
                  // onBlur={() => setFieldTouched("price")}
                />
              </View>
              {/* <ErrorMessage error={errors.price} visible={touched.price} /> */}
              <View style={styles.loginInputContainer}>
                <Ionicons
                  style={styles.icon}
                  name="bookmark-outline"
                  size={22}
                  color="black"
                />
                <TextInput
                  // onChangeText={handleChange("description")}
                  onChangeText={(text) => setDiscription(text)}
                  style={[styles.loginInput, { padding: 0, paddingLeft: 5 }]}
                  placeholder={"Description"}
                  clearButtonMode="always"
                  numberOfLines={3}
                  multiline
                  keyboardType={"default"}
                  // onBlur={() => setFieldTouched("description")}
                />
              </View>
              {/* <ErrorMessage
                error={errors.description}
                visible={touched.description}
              /> */}
            </View>
            <TouchableOpacity
              // onPress={() => login()}
              onPress={() => {
                // handleSubmit();
                loader().then(() => submit());
              }}
              style={styles.submitButton}
              activeOpacity={0.85}
            >
              <Text style={styles.submitButtonText}>CREATE</Text>
            </TouchableOpacity>
          </>
          {/* )} */}
          {/* </Formik> */}
        </View>
      )}
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
