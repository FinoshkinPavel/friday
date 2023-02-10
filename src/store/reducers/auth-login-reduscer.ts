import { Dispatch } from "redux";
import { utilsError } from "../../utils/error-utils";
import { setAppStatusRequest } from "./app-reducer";
import { setUserInfo } from "./user-information-reducer";
import { registerAPI } from "../../services/api/registerAPI";
import { authAPI } from "../../services/api/authAPI";
import { RegisteredParamsType } from "../../types/api-types/api-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: false,
    registered: false,
  } as InitialStateType,
  reducers: {
    setLoggedIn(state, action: PayloadAction<{ loggedIn: boolean }>) {
      state.loggedIn = action.payload.loggedIn;
    },
    setRegistered(state, action: PayloadAction<{ registered: boolean }>) {
      state.registered = action.payload.registered;
    },
  },
});
export const authLoginReducer = slice.reducer;
export const { setLoggedIn, setRegistered } = slice.actions;

export const registering =
  (data: RegisteredParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusRequest({ status: "loading" }));
    registerAPI
      .registered(data)
      .then((res) => {
        dispatch(setRegistered({ registered: true }));
        dispatch(setAppStatusRequest({ status: "succeeded" }));
      })
      .catch((e) => utilsError(e, dispatch));
  };

export const logIn = (data: RegisteredParamsType) => (dispatch: Dispatch) => {
  dispatch(setAppStatusRequest({ status: "loading" }));
  authAPI
    .logIn(data)
    .then((res) => {
      dispatch(setUserInfo(res.data));
      dispatch(setLoggedIn({ loggedIn: true }));
      dispatch(setAppStatusRequest({ status: "succeeded" }));
    })
    .catch((e) => utilsError(e, dispatch));
};

export const logOut = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusRequest({ status: "loading" }));
  authAPI
    .logOut()
    .then((res) => {
      dispatch(setLoggedIn({ loggedIn: false }));
      dispatch(setAppStatusRequest({ status: "succeeded" }));
    })
    .catch((e) => utilsError(e, dispatch));
};
//_____________________Type_____________________
type InitialStateType = {
  loggedIn: boolean;
  registered: boolean;
};
