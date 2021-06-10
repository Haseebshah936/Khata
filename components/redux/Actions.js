import { auth, fbAuthProvider, googleAuthProvider } from "../../firebase";
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

export const logOut = () => {
  return {
    type: SIGNOUT,
    payload: {
      profilePic: "",
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

export const loginWithEmail = (email, password) => {
  return async (dispatch) => {
    // dispatch(loginRequest());
    auth
      .signInWithEmailAndPassword(email, password)
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
        const result = JSON.parse(
          await SecureStore.getItemAsync("AppSKHATA786")
        );
        if (result || result != null) {
          state = result;
        } else {
          await SecureStore.setItemAsync("AppSKHATA786", JSON.stringify(state));
        }
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
        // Build Firebase credential with the Facebook access token.
        const credential = fbAuthProvider.credential(token);

        // Sign in with credential from the Facebook user.
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
            const result = JSON.parse(
              await SecureStore.getItemAsync("AppSKHATA786")
            );
            if (result || result != null) {
              state = result;
              console.log(state);
            } else {
              await SecureStore.setItemAsync(
                "AppSKHATA786",
                JSON.stringify(state)
              );
            }
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
        behavior: "web",
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

            const result = JSON.parse(
              await SecureStore.getItemAsync("AppSKHATA786")
            );
            if (result || result != null) {
              state = result;
            } else {
              await SecureStore.setItemAsync(
                "AppSKHATA786",
                JSON.stringify(state)
              );
            }
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

export const register = (email, password, phoneNo, userName) => {
  const store = useSelector((state) => state);
  const profilePic = store.Reducer.profilePic;
  return async (dispatch) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        // Signed in
        var user = userCredential.user;
        if (profilePic !== "") {
          console.log(profilePic);
          const response = await fetch(profilePic);
          const blob = await response.blob();
          let ref = storage.ref().child("ProfilePics/" + user.uid);
          await ref.put(blob);
          setProfilePic(ref.getDownloadURL());
        }
        user
          .updateProfile({
            displayName: userName,
            photoURL: profilePic,
            phoneNumber: phoneNo,
          })
          .then(async () => {
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
          .catch(function (error) {
            // An error happened.
            alert(error);
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

export const addImage = async () => {
  console.log("Add Image");
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.2,
  });
  if (!result.cancelled) {
    setProfilePic(result.uri);
  }
};

export const setProfilePic = (uri) => {
  return {
    type: PHOTOURI,
    payload: uri,
  };
};

export const removeProfilePic = () => {
  return {
    type: PHOTOURIREMOVEE,
  };
};
