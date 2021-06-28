import {
  actionCodeSettings,
  auth,
  db,
  fbAuthProvider,
  firdb,
  firestoreForOtherApp,
  googleAuthProvider,
  storage,
} from "../../firebase";
import {
  DECREMENT,
  INCREMENT,
  LOAD,
  LOGINFAILURE,
  OFFLINE,
  SUCCESSFULL,
  SIGNOUT,
  SCROLL,
  COUNTERINC,
  COUNTERDEC,
  PHOTOURI,
  PHOTOURIREMOVE,
  SETDATA,
  SETOFFLINENOTE,
  CHECKVERIFICATION,
  KHATAURI,
  KHATAURIREMOVE,
  ADDDATA,
  ADDPRODUCT,
  KEY,
  ISLOADING,
  ROUTING,
} from "./ActionTypes";
import * as SecureStore from "expo-secure-store";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import "firebase/firestore";
import {
  androidClientIdGoogle,
  appIdFb,
  iosClientIdGoogle,
} from "../../APIKeys";
import { useSelector } from "react-redux";
import { add } from "react-native-reanimated";
import Store from "./Store";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Network from "expo-network";
import { Alert } from "react-native";

export const increment = (num = 1) => {
  return {
    type: INCREMENT,
    payload: num,
  };
};

export const counterIncrease = () => {
  return {
    type: COUNTERINC,
  };
};

export const counterDecrease = () => {
  return {
    type: COUNTERDEC,
  };
};

export const decrement = (num = 1) => {
  return {
    type: DECREMENT,
    payload: num,
  };
};

export const load = (num = 0) => {
  return {
    type: LOAD,
    payload: num,
  };
};

export const loginSuccessFull = (
  userID,
  photoUrl,
  displayName,
  count,
  offlineNote,
  data,
  email,
  password
) => {
  return {
    type: SUCCESSFULL,
    payload: {
      photoUrl,
      userID,
      displayName,
      count,
      offlineNote,
      data,
      email,
      password,
    },
  };
};

export const loginFailure = () => {
  return {
    type: LOGINFAILURE,
    payload: {
      loading: false,
    },
  };
};

export const connection = (offline) => {
  return {
    type: OFFLINE,
    payload: {
      offline,
    },
  };
};

export const setData = (data) => {
  return {
    type: SETDATA,
    payload: data,
  };
};
export const setOfflineNote = (offlineNote) => {
  return {
    type: SETOFFLINENOTE,
    payload: offlineNote,
  };
};

export const logOut = () => {
  return {
    type: SIGNOUT,
    payload: {
      profilePic: null,
      userID: "",
      displayName: "",
      interstitialCount: 0,
      enableScroll: true,
      offline: [],
      data: [],
      email: null,
      password: null,
    },
  };
};

export const scroll = (state) => {
  return {
    type: SCROLL,
    payload: state,
  };
};

export const verfication = () => {
  return {
    type: CHECKVERIFICATION,
  };
};

export const setProfilePic = (uri) => {
  return {
    type: PHOTOURI,
    payload: uri,
  };
};

export const removeProfilePic = () => {
  return {
    type: PHOTOURIREMOVE,
  };
};

export const setKhataImage = (uri) => {
  return {
    type: KHATAURI,
    payload: uri,
  };
};

export const removeKhataImage = () => {
  return {
    type: KHATAURIREMOVE,
  };
};

export const addKhataAccount = (data) => {
  return {
    type: ADDDATA,
    payload: data,
  };
};

export const addProductData = (data) => {
  return {
    type: ADDPRODUCT,
    payload: data,
  };
};

export const setIsLoading = (state) => {
  return {
    type: ISLOADING,
    payload: state,
  };
};

export const setRouting = (routing) => {
  return {
    type: ROUTING,
    payload: routing,
  };
};

export const loginOffline = () => {
  return async (dispatch) => {
    const result = JSON.parse(await AsyncStorage.getItem("AppSKHATA786"));
    if (result || result != null) {
      const state = result;
      dispatch(
        loginSuccessFull(
          state.userID,
          state.photoUrl,
          state.displayName,
          state.count,
          state.offlineNote,
          state.data,
          state.email,
          state.password
        )
      );
      dispatch(loadData());
    } else {
      dispatch(loginFailure());
    }
  };
};

export const loginWithFacebook = () => {
  // console.log("FB");
  return async (dispatch) => {
    try {
      await Facebook.initializeAsync({
        appId: appIdFb,
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });

      if (type === "success") {
        const credential = fbAuthProvider.credential(token);
        auth
          .signInWithCredential(credential)
          .then(async (userCredential) => {
            const user = userCredential.user;
            let state = {
              photoUrl: user.photoURL,
              userID: user.uid,
              displayName: user.displayName,
              count: 0,
              data: [],
              offlineNote: [],
              email: "FB",
              password: null,
            };
            await AsyncStorage.setItem("AppSKHATA786", JSON.stringify(state));
            dispatch(
              loginSuccessFull(
                state.userID,
                state.photoUrl,
                state.displayName,
                state.count,
                state.offlineNote,
                state.data
              )
            );
          })
          .catch((error) => {
            alert(error);
          }); // Handle Errors here.
        console.log("Successfull");
      } else {
        alert("Facebook App not installed");
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
};

export const loginWithGoogle = () => {
  return async (dispatch) => {
    try {
      const result = await Google.logInAsync({
        androidClientId: androidClientIdGoogle,
        iosClientId: iosClientIdGoogle,
        behavior: "system",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const credential = googleAuthProvider.credential(
          result.idToken,
          result.accessToken
        );
        auth
          .signInWithCredential(credential)
          .then(async (userCredential) => {
            const user = userCredential.user;
            let state = {
              photoUrl: user.photoURL,
              userID: user.uid,
              displayName: user.displayName,
              count: 0,
              data: [],
              offlineNote: [],
              email: user.email,
              password: null,
            };
            await AsyncStorage.setItem("AppSKHATA786", JSON.stringify(state));
            dispatch(
              loginSuccessFull(
                state.userID,
                state.photoUrl,
                state.displayName,
                state.count,
                state.offlineNote,
                state.data
              )
            );
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        alert("Google Login Cancelled");
      }
    } catch (e) {
      alert(`Google Login Error: ${e}`);
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    auth
      .signOut()
      .then(async () => {
        const state = null;
        await AsyncStorage.setItem("AppSKHATA786", JSON.stringify(state));
        dispatch(logOut());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const loginWithEmail = (email, password) => {
  return async (dispatch) => {
    let count = 0;
    // dispatch(loginRequest());
    auth
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          let state = {
            photoUrl: user.photoURL,
            userID: user.uid,
            displayName: user.displayName,
            count: 0,
            data: [],
            offlineNote: [],
            email,
            password,
          };
          await AsyncStorage.setItem("AppSKHATA786", JSON.stringify(state));
          dispatch(
            loginSuccessFull(
              state.userID,
              state.photoUrl,
              state.displayName,
              state.count,
              state.offlineNote,
              state.data,
              state.email,
              state.password
            )
          );
          // firebase.firestore().clearPersistence().catch(console.log);
          dispatch(loadData());
        } else {
          Alert.alert(
            "Email Verfication",
            "A verification link is already sent to your email. Please verify your email to login.",
            [
              {
                text: "Re-Send",
                onPress: () => {
                  if (count === 0)
                    user.sendEmailVerification().then(() => {
                      console.log("Sent");
                    });
                  else {
                    Alert.alert("Re-Send Available", "After 60 seconds!");
                    setTimeout(() => {
                      count--;
                    }, 60000);
                  }
                },
              },
              {
                text: "OK",
              },
            ]
          );
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
};

export const uploadImage = async (uri, id) => {
  if (uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    let ref = storage.ref().child("ProfileImages/" + id);
    await ref.put(blob);
    return ref.getDownloadURL();
  }
  return null;
};

export const addImage = () => {
  return async (dispatch) => {
    // console.log("Add Image");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.1,
    });
    if (!result.cancelled) {
      // console.log(result.uri);
      dispatch(setProfilePic(result.uri));
    }
  };
};

export const register = (
  email,
  password,
  userName,
  profilePic,
  credential = null
) => {
  return async (dispatch) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        // Signed in
        var user = userCredential.user;
        // console.log(profilePic);
        uploadImage(profilePic, user.uid).then((uri) => {
          // console.log(uri);
          dispatch(setProfilePic(uri));
          // console.log(credential);
          user
            .updateProfile({
              displayName: userName,
              photoURL: uri,
            })
            .then(() => {
              if (credential) {
                user
                  .updatePhoneNumber(credential)
                  .catch((err) => {
                    return "Phone Number is Already in use. You can Add it Later";
                  })
                  .then((st) => {
                    user.sendEmailVerification().then(() => {
                      dispatch(verfication());
                      alert(
                        "An Email Verification link is sent to your email" + st
                      );
                      dispatch(loginFailure());
                    });
                  });
              } else {
                user.sendEmailVerification().then(() => {
                  dispatch(verfication());
                  alert("An Email Verification link is sent to your email");
                  dispatch(loginFailure());
                });
              }
            })
            .catch((err) => {
              alert(err);
            });
          // .then(async () => {
          //   let state = {
          //     photoUrl: user.photoURL,
          //     userID: user.uid,
          //     displayName: user.displayName,
          //     count: 0,
          //     data: [],
          //     offlineNote: [],
          //   };

          //   await AsyncStorage.setItem(
          //     "AppSKHATA786",
          //     JSON.stringify(state)
          //   );
          //   dispatch(
          //     loginSuccessFull(
          //       state.userID,
          //       state.photoUrl,
          //       state.displayName,
          //       state.count,
          //       state.offlineNote,
          //       state.data
          //     )
          //   );
          // })
          // .catch(function (error) {
          //   // An error happened.
          //   alert(error);
          // });
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  };
};

export const addKhataImage = () => {
  return async (dispatch) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.1,
    });
    if (!result.cancelled) {
      dispatch(setKhataImage(result.uri));
    }
  };
};

export const uploadKhataImage = async (uri, id) => {
  if (uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const userId = Store.getState().Reducer.userID;
    let ref = storage
      .ref()
      .child("KhataImages/" + userId + "/" + id + "/" + id);
    await ref.put(blob);
    return ref.getDownloadURL();
  }
  return null;
};

export const uploadProductImage = async (uri, id) => {
  if (uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const state = Store.getState().Reducer;
    const userId = state.userID;
    const key = state.key;

    let ref = storage
      .ref()
      .child("KhataImages/" + userId + "/" + key + "/" + "productImage/" + id);
    await ref.put(blob);
    return ref.getDownloadURL();
  }
  return null;
};

export const addKhataProfile = (name, phoneNo, address, uri) => {
  return async (dispatch) => {
    let id;
    const state = Store.getState().Reducer;
    let userId = state.userID;
    const data = state.data;
    const length = data.length;
    if (data.length == 0) {
      id = 0;
    } else {
      id = data[data.length - 1].key + 1;
    }
    const khataProfileData = {
      key: id,
      userName: name,
      phoneNo: phoneNo,
      address: address,
      uri: uri,
      data: [],
    };
    uploadKhataImage(uri, id)
      .then((uri) => {
        db.collection(userId)
          .add({ ...khataProfileData, uri })
          .then(() => {
            // alert("User added!");
          });
        dispatch(setRouting(true));
        dispatch(counterIncrease());
        dispatch(setIsLoading(false));
      })
      .then(() => dispatch(removeKhataImage()));
    dispatch(addKhataAccount(khataProfileData));
    await AsyncStorage.setItem(
      "AppSKHATA786",
      JSON.stringify(Store.getState().Reducer)
    );
  };
};

export const addProduct = (productName, price, description = "", uri) => {
  return async (dispatch) => {
    let id;
    const key = Store.getState().Reducer.key;
    const state = Store.getState().Reducer;
    const data = state.data.filter((m) => m.key == key)[0].data;
    const length = state.data.length;
    let userId = state.userID;
    if (data.length == 0) {
      id = 0;
    } else {
      id = data[data.length - 1].key + 1;
    }
    const profileProduct = {
      key: id,
      productName,
      status: false,
      price,
      description,
      uri,
    };
    const productData = [...data, profileProduct];
    let profile = [];
    for (let i = 0; i < length; i++) {
      if (state.data[i].key == key) {
        profile.push({
          ...state.data[i],
          data: [...state.data[i].data, profileProduct],
        });
      } else {
        profile.push({
          ...state.data[i],
          data: [...state.data[i].data],
        });
      }
    }
    dispatch(addProductData(profile));
    uploadProductImage(uri, id).then((uri) => {
      dispatch(setKhataImage(uri));
      let documentID;
      db.collection(userId)
        .where("key", "==", key)
        .get()
        .then((querySnapshot) => {
          // console.log(querySnapshot.size);
          querySnapshot.forEach(
            (documentSnapshot) => (documentID = documentSnapshot.id)
          );
        })
        .then(() => {
          db.collection(userId)
            .doc(documentID)
            .update({
              data: firdb.FieldValue.arrayUnion({
                ...profileProduct,
                uri,
              }),
            });
        })
        .catch(console.log)
        .then(() => dispatch(removeKhataImage()));
      dispatch(setRouting(true));
      dispatch(counterIncrease());
      dispatch(setIsLoading(false));
    });

    // dispatch(removeKhataImage());
    await AsyncStorage.setItem(
      "AppSKHATA786",
      JSON.stringify(Store.getState().Reducer)
    );
  };
};

export const setKey = (key) => {
  return {
    type: KEY,
    payload: key,
  };
};

export const setStatus = (productKey) => {
  return async (dispatch) => {
    const key = Store.getState().Reducer.key;
    const state = Store.getState().Reducer;
    const data = state.data.filter((m) => m.key == key)[0].data;
    const length = state.data.length;
    let userId = state.userID;
    const productData = [];
    data.forEach((product) => {
      if (product.key == productKey) {
        const p = {
          ...product,
          status: true,
        };
        productData.push(p);
      } else {
        productData.push({
          ...product,
        });
      }
    });

    // productData.map((p) => (p.key == productKey ? (p.status = true) : p));
    let profile = [];
    for (let i = 0; i < length; i++) {
      if (state.data[i].key == key) {
        profile.push({
          ...state.data[i],
          data: [...productData],
        });
      } else {
        profile.push({
          ...state.data[i],
          data: [...state.data[i].data],
        });
      }
    }
    dispatch(addProductData(profile));
    console.log(userId + " " + key);
    let documentID;
    let docData = [];
    db.collection(userId)
      .where("key", "==", key)
      .get()
      .then((querySnapshot) => {
        // console.log(querySnapshot.size);
        querySnapshot.forEach((documentSnapshot) => {
          documentID = documentSnapshot.id;
          docData = documentSnapshot.data().data;
        });
        console.log(documentID);
        docData.map((p) => (p.key == productKey ? (p.status = true) : p));
        // docData.map((productData) => {
        //   productData.key == productKey? productData = {...productData, status=true} : productData
        // })
        console.log("Data", docData);
      })
      .then(() => {
        db.collection(userId).doc(documentID).update({
          data: docData,
        });
      })
      .then(() => alert("Product added"))
      .catch(console.log)
      .then(() => dispatch(removeKhataImage()));

    await AsyncStorage.setItem(
      "AppSKHATA786",
      JSON.stringify(Store.getState().Reducer)
    );
  };
};

export const remove = (key) => {
  return async (dispatch) => {
    const state = Store.getState().Reducer;
    const data = state.data.filter((m) => m.key != key);
    const productData = state.data.filter((m) => m.key == key)[0].data;
    let userId = state.userID;
    let documentID;
    db.collection(userId)
      .where("key", "==", key)
      .get()
      .then((querySnapshot) => {
        // console.log(querySnapshot.size);
        querySnapshot.forEach(
          (documentSnapshot) => (documentID = documentSnapshot.id)
        );
        console.log(documentID);
      })
      .then(() => {
        if (documentID) {
          db.collection(userId)
            .doc(documentID)
            .delete()
            .then(() => {
              console.log("User deleted!");
            })
            .catch((err) => {
              console.log(err);
            });

          storage
            .ref()
            .child("KhataImages/" + userId + "/" + key + "/" + key)
            .delete()
            .catch(console.log);

          productData.forEach((product) => {
            const id = product.key;
            storage
              .ref()
              .child(
                "KhataImages/" + userId + "/" + key + "/" + "productImage/" + id
              )
              .delete()
              .catch(console.log);
          });
        }
      });
    dispatch(addProductData(data));
    await AsyncStorage.setItem(
      "AppSKHATA786",
      JSON.stringify(Store.getState().Reducer)
    );
  };
};

export const check = async () => {
  let status = NetInfo.fetch().then((status) => status);
  // let { isConnected } = await Network.getNetworkStateAsync();
  return status;
};

export const loadData = () => {
  return async (dispatch) => {
    alert("Entered");
    let array = [];
    check().then((status) => {
      if (status.isInternetReachable) {
        auth.onAuthStateChanged((user) => {
          if (user) {
            const userID = user.uid;
            db.collection(userID)
              .orderBy("key", "asc")
              .get()
              .then((querySnapshot) => {
                if (querySnapshot.size != 0) {
                  querySnapshot.forEach((documentSnapshot) =>
                    array.push(documentSnapshot.data())
                  );
                }
              })
              .then(async () => {
                // console.log("Data", array);
                dispatch(addProductData(array));
                // const state = Store.getState().Reducer;
                dispatch(setIsLoading(false));
                const state = Store.getState().Reducer;
                check().then(async (status) => {
                  if (status.isInternetReachable) {
                    alert("Saved");
                    try {
                      await AsyncStorage.setItem(
                        "AppSKHATA786",
                        JSON.stringify(state)
                      );
                    } catch (error) {
                      console.log(error);
                    }
                  } else {
                    alert("Loaded");
                    getDataAsync()
                      .then((result) => {
                        // alert("Data" + result.data);
                        dispatch(addProductData(result.data));
                        setIsLoading(false);
                        // const state = Store.getState().Reducer;
                      })
                      .catch(console.log);
                  }
                });
              })
              .catch(console.log);
          } else {
            dispatch(signOut());
          }
        });
      } else {
        getDataAsync()
          .then((result) => {
            // alert("Data" + result.data);
            dispatch(addProductData(result.data));
            setIsLoading(false);
            // const state = Store.getState().Reducer;
          })
          .catch(console.log);
      }
    });
  };
};

const getDataAsync = async () => {
  return JSON.parse(await AsyncStorage.getItem("AppSKHATA786"));
};
