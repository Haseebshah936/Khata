import {
  actionCodeSettings,
  auth,
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
  data
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
    },
  };
};

export const scroll = (state) => {
  return {
    type: SCROLL,
    payload: state,
  };
};

export const loginOffline = () => {
  return async (dispatch) => {
    const result = JSON.parse(await SecureStore.getItemAsync("AppSKHATA786"));
    if (result || result != null) {
      state = result;
      console.log(result);
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
    } else {
      dispatch(loginFailure());
    }
  };
};

export const loginWithFacebook = () => {
  console.log("FB");
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

export const uploadImage = async (uri, id) => {
  if (uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    let ref = storage.ref().child("Images/" + id);
    await ref.put(blob);
    return ref.getDownloadURL();
  }
  return null;
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
          };
          await SecureStore.setItemAsync("AppSKHATA786", JSON.stringify(state));
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

export const verfication = () => {
  return {
    type: CHECKVERIFICATION,
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
              if (credential) user.updatePhoneNumber(credential);
              user.sendEmailVerification().then(() => {
                dispatch(verfication());
                alert("An Email Verification link is sent to your email");
                dispatch(loginFailure());
              });
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

export const addImage = () => {
  return async (dispatch) => {
    console.log("Add Image");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.2,
    });
    // let result = await ImagePicker.launchCameraAsync({ quality: 0.2 });

    if (!result.cancelled) {
      console.log(result.uri);
      dispatch(setProfilePic(result.uri));
    }
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
