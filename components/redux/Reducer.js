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
  PHOTOURIREMOVE,
  PHOTOURI,
} from "./ActionTypes";

const initialState = {
  signin: false,
  loading: true,
  profilePic: null,
  userID: "",
  displayName: "",
  count: 0,
  enableScroll: true,
  offline: false,
  offlineNote: [
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
  ],
  data: [
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
    {
      first_name: "Haseeb",
    },
  ],
};

export default Reducer = (state = initialState, action) => {
  // console.log(state);
  switch (action.type) {
    case SUCCESSFULL:
      return {
        ...state,
        signin: true,
        loading: false,
        profilePic: action.payload.photoUrl,
        userID: action.payload.userID,
        displayName: action.payload.displayName,
        count: action.payload.count,
        offlineNote: action.payload.offlineNote,
        data: action.payload.data,
      };
    case LOGINFAILURE:
      return {
        ...state,
        loading: false,
      };
    case OFFLINE:
      return {
        ...state,
        offline: action.payload,
      };
    case SCROLL: //scroll
      return {
        ...state,
        enableScroll: action.payload,
      };
    case SIGNOUT:
      return {
        ...state,
        signin: false,
        loading: false,
        profilePic: action.payload.photoUrl,
        userID: action.payload.userID,
        displayName: action.payload.displayName,
        count: action.payload.count,
        offlineNote: action.payload.offlineNote,
        data: action.payload.data,
      };
    case COUNTERINC: //InterstitialcounterIncrease
      return {
        ...state,
        count: state.count + 1,
      };
    case COUNTERDEC: //InterstitialcounterDecrease
      return {
        ...state,
        count: state.count - 1,
      };
    case PHOTOURI:
      return {
        ...state,
        profilePic: action.payload,
      };
    case PHOTOURIREMOVE:
      return {
        ...state,
        profilePic: "",
      };
    default:
      return state;
  }

  //load
  //add
  //delete
  //update
};
