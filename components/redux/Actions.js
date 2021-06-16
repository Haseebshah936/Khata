import {
  actionCodeSettings,
  auth,
  db,
  fbAuthProvider,
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
} from "./ActionTypes";
import * as SecureStore from "expo-secure-store";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import * as ImagePicker from "expo-image-picker";

import {
  androidClientIdGoogle,
  appIdFb,
  iosClientIdGoogle,
} from "../../APIKeys";
import { useSelector } from "react-redux";
import { add } from "react-native-reanimated";
import Store from "./Store";

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

export const addKhataProductData = (key, data) => {
  return {
    type: ADDPRODUCT,
    payload: {
      key,
      data,
    },
  };
};

export const loginOffline = () => {
  return async (dispatch) => {
    const result = JSON.parse(await SecureStore.getItemAsync("AppSKHATA786"));
    if (result || result != null) {
      state = result;
      // console.log("Result from login offlie" + result);
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

            await SecureStore.setItemAsync(
              "AppSKHATA786",
              JSON.stringify(state)
            );

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
            await SecureStore.setItemAsync(
              "AppSKHATA786",
              JSON.stringify(state)
            );
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
        await SecureStore.setItemAsync("AppSKHATA786", JSON.stringify(state));
        dispatch(logOut());
      })
      .catch((error) => {
        // An error happened.
      });
  };
};

export const loginWithEmail = (email, password) => {
  return async (dispatch) => {
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
          await SecureStore.setItemAsync("AppSKHATA786", JSON.stringify(state));
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
        } else {
          alert(
            "Account exist but Email is Not verified. Verify your email first or forget password to fix it."
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
    console.log("Add Image");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.2,
    });
    if (!result.cancelled) {
      console.log(result.uri);
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

          //   await SecureStore.setItemAsync(
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
    // console.log("Add Image");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.2,
    });
    if (!result.cancelled) {
      // console.log(result.uri);
      dispatch(setKhataImage(result.uri));
    }
  };
};

export const uploadKhataImage = async (uri, id) => {
  if (uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    let ref = storage.ref().child("KhataImages/" + id);
    await ref.put(blob);
    return ref.getDownloadURL();
  }
  return null;
};

export const addKhataProfile = (name, phoneNo, address, uri) => {
  return async (dispatch) => {
    let id;
    const data = Store.getState().Reducer.data;
    // console.log(values);
    // alert("IN Side Action addKhataProfile" + data);
    const length = data.length;
    let userId = auth.currentUser.uid;
    if (data.length == 0) {
      id = 0;
    } else {
      id = data[data.length - 1].key + 1;
    }
    // id = 0;
    const khataProfileData = {
      key: id,
      userName: name,
      phoneNo: phoneNo,
      address: address,
      uri: uri,
      data: [],
    };
    // console.log("IN Side Action addKhataProfile" + khataProfileData.key);
    dispatch(addKhataAccount(khataProfileData));
    uploadKhataImage(uri, id)
      .then((uri) => {
        dispatch(setKhataImage(uri));
        db.collection(userId)
          .add({ ...khataProfileData, uri })
          .then(() => {
            alert("User added!");
          });
      })
      .then(() => dispatch(removeKhataImage()));
    await SecureStore.setItemAsync(
      "AppSKHATA786",
      JSON.stringify(Store.getState().Reducer)
    );
    console.log("Let Check State" + Store.getState().Reducer);
  };
};

export const addKhataProduct = (name, price, description = "", uri) => {
  return async (dispatch) => {
    let id;
    const data = Store.getState().Reducer.data.filter((m) => m.key == key).data;
    // console.log(values);
    alert("IN Side Action addKhataProduct" + data);
    const length = data.length;
    let userId = auth.currentUser.uid;
    if (data.length == 0) {
      id = 0;
    } else {
      id = data[data.length - 1].key + 1;
    }
    // id = 0;
    const khataProfileProduct = {
      key: id,
      userName: name,
      price,
      description,
      uri,
    };
    // console.log("IN Side Action addKhataProfile" + khataProfileProduct.key);
    dispatch(addKhataAccount(khataProfileProduct));
    uploadKhataImage(uri, id)
      .then((uri) => {
        dispatch(setKhataImage(uri));
        db.collection(userId)
          .add({ ...khataProfileProduct, uri })
          .then(() => {
            alert("User added!");
          });
      })
      .then(() => dispatch(removeKhataImage()));
    await SecureStore.setItemAsync(
      "AppSKHATA786",
      JSON.stringify(Store.getState().Reducer)
    );
    console.log("Let Check State" + Store.getState().Reducer);
  };
};

export const setKey = (key) => {
  return {
    type: KEY,
    payload: key,
  };
};

// export const remove = (key) => {
//   // console.log(key)
//   var uid = userId + "/";
//   console.log(key);
//   let l;
//   db.collection(userId)
//     .where("key", "==", key)
//     .get()
//     .then((querySnapshot) => {
//       console.log(querySnapshot.size);
//       querySnapshot.forEach((documentSnapshot) => (l = documentSnapshot.id));
//       console.log(l);
//     })
//     .then(() => {
//       if (l) {
//         db.collection(userId)
//           .doc(l)
//           .delete()
//           .then(() => {
//             console.log("User deleted!");
//           });

//         storage
//           .ref()
//           .child("Images/" + uid + key)
//           .delete()
//           .then(() => {
//             console.log("File Deleted");
//           })
//           .catch((error) => console.log(error))
//           .finally(() => {
//             setAdded(added + 1);
//           });
//       }
//     });
// };
