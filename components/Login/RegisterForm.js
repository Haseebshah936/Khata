import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  Dimensions,
  Keyboard,
  Pressable,
  Modal,
  Button,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import * as Yup from "yup";
import { Formik } from "formik";
import ErrorMessage from "./ErrorMessage";
import styles from "../Style/stylesRegister";
import { useDispatch, useSelector } from "react-redux";
import { register, addImage } from "../redux/Actions";
import { auth, phoneAuthProvider, phoneProvider } from "../../firebase";
import Constants from "expo-constants";
import color from "../Style/color";
import { firebaseConfig } from "../../APIKeys";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

const validationSchema = Yup.object().shape({
  userName: Yup.string().required().label("User Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

const hold =
  "https://firebasestorage.googleapis.com/v0/b/todo-64931.appspot.com/o/icon-animation-1.gif?alt=media&token=0a4b467c-53a8-47d1-b4ad-5ece7abed641";

function RegisterForm({ navigation }) {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  let uri = store.Reducer.profilePic;
  const [visible, setVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState();
  const [verificationId, setVerificationId] = useState();
  const [message, showMessage] = useState();
  const recaptchaVerifier = useRef(null);
  const [val, setVal] = useState();
  const sendVerificationCode = async (phoneNumber) => {
    try {
      // console.log(phoneNumber);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      // console.log("Verification" + verificationId);
      setVerificationId(verificationId);
      showMessage("Verification code has been sent to your phone.");
    } catch (err) {
      // console.log(err);
      showMessage(`Error: ${err.message}`);
    }
  };
  const confirmVerification = async () => {
    try {
      const credential = phoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      // console.log(credential);
      dispatch(
        register(val.email, val.password, val.userName, uri, credential)
      );
      showMessage("Phone authentication successful 👍");
      setVisible(!visible);
    } catch (err) {
      showMessage(`Error: ${err.message}`);
    }
  };
  const submit = async (values) => {
    if (values.phoneNo) {
      setVisible(true);
      await sendVerificationCode(values.phoneNo);
    } else {
      dispatch(register(values.email, values.password, values.userName, uri));
    }
  };
  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
      <>
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
            onSubmit={(values) => {
              setVal(values);
              submit(values);
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
                      onPress={() => dispatch(addImage())}
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
                      placeholder={"+92 333 333 3333"}
                      autoCompleteType="tel"
                      textContentType="telephoneNumber"
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
                      name="card-outline"
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
            onPress={() => {
              navigation.navigate("Login");
              console.log(Dimensions.get("window").height);
              console.log(Dimensions.get("screen").height);
            }}
          >
            Login
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
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />
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
                  onChangeText={(text) => setVerificationCode(text)}
                  placeholder={"Code"}
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
                    confirmVerification();
                  }}
                >
                  <Text style={styl.modalText}>Submit</Text>
                </TouchableHighlight>
              </View>
              <Text style={styl.textStyle1}>{message}</Text>
            </View>
          </Pressable>
        </Modal>
      </>
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

export default RegisterForm;
