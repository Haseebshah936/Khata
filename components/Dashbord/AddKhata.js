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
import styles from "../Style/stylesRegister";
import ErrorMessage from "../Login/ErrorMessage";
import { android, ios } from "../../APIKeys";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
import { useDispatch, useSelector } from "react-redux";
import {
  addKhataAccount,
  addKhataImage,
  addKhataProfile,
} from "../redux/Actions";

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
  const bannerID =
    Platform.OS === "ios" ? ios.admobBanner : android.admobBanner;
  const interstitialID =
    Platform.OS === "ios" ? ios.admobInterstitial : android.admobInterstitial;
  // const [uri, setUri] = useState(null);
  const store = useSelector((state) => state);
  const uri = store.Reducer.khataImage;
  const hold =
    "https://firebasestorage.googleapis.com/v0/b/todo-64931.appspot.com/o/icon-animation-1.gif?alt=media&token=0a4b467c-53a8-47d1-b4ad-5ece7abed641";
  const dispatch = useDispatch();

  const instential = async () => {
    await AdMobInterstitial.setAdUnitID(interstitialID);
    await AdMobInterstitial.requestAdAsync({
      servePersonalizedAds: true,
    }).catch(console.log);
    if (await AdMobInterstitial.getIsReadyAsync().valueOf)
      await AdMobInterstitial.showAdAsync();
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <View style={styles.loginTextTopContainer}>
        <Text style={styles.loginText}>Create Khata</Text>
        <View style={[styles.circleContainer, { left: 30 }]}>
          <View style={styles.loginTextTopContainerSmallCircle} />
          <View style={styles.loginTextTopContainerBigCircle} />
        </View>
      </View>
      <View>
        <Formik
          initialValues={{ name: "", phoneNo: "", address: "" }}
          onSubmit={(values) => {
            dispatch(
              addKhataProfile(values.name, values.phoneNo, values.address, uri)
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
              <View style={styles.loginContainer}>
                <View style={styles.profileContainer}>
                  <TouchableOpacity
                    style={styles.profilePic}
                    activeOpacity={0.6}
                    onPress={() => dispatch(addKhataImage(uri))}
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
                  <View style={{ flex: 1 }}>
                    <View style={styles.productContainer}>
                      <Ionicons
                        style={styles.icon}
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
                    name="home-outline"
                    size={22}
                    color="black"
                  />
                  <TextInput
                    onChangeText={handleChange("address")}
                    style={[styles.loginInput, { padding: 0, paddingLeft: 5 }]}
                    placeholder={"Address"}
                    clearButtonMode="always"
                    numberOfLines={3}
                    multiline
                    keyboardType={"default"}
                    onBlur={() => setFieldTouched("address")}
                  />
                </View>
                <ErrorMessage
                  error={errors.address}
                  visible={touched.address}
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
        />
      </View>

      <StatusBar hidden style={"inverted"} />
    </Pressable>
  );
}

export default AddKhata;
