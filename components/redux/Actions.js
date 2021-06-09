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
} from "./ActionTypes";
import * as SecureStore from "expo-secure-store";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import {
  androidClientIdGoogle,
  appIdFb,
  iosClientIdGoogle,
} from "../../APIKeys";

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
        dispatch(loginFailure());
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
            dispatch(loginFailure());
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
            dispatch(loginFailure());
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
