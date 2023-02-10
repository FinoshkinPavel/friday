import { Dispatch } from "redux";
import { setAppStatusRequest } from "./app-reducer";
import { utilsError } from "../../utils/error-utils";
import { updateUserInfoAPI } from "../../services/api/updateUserInfoAPI";
import {
  UpdateUserName,
  UserInfoResponse,
} from "../../types/api-types/api-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialStateType = {
  _id: null,
  email: null,
  rememberMe: null,
  name: null,
  avatar: null,
  verified: null,
  publicCardPacksCount: null,
  created: null,
  updated: null,
};

const slice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserInfoResponse>) {
      return { ...action.payload };
    },
  },
});

export const userInfoReducer = slice.reducer;
export const { setUserInfo } = slice.actions;

export const updateUserInfo =
  (data: UpdateUserName) => (dispatch: Dispatch) => {
    dispatch(setAppStatusRequest({ status: "loading" }));
    updateUserInfoAPI
      .changeUserName(data)
      .then((res) => {
        dispatch(setUserInfo(res.data.updatedUser));
        dispatch(setAppStatusRequest({ status: "succeeded" }));
      })
      .catch((e) => utilsError(e, dispatch));
  };

//_____________________Type_____________________
type InitialStateType = {
  _id: string | null;
  email: string | null;
  rememberMe: boolean | null;
  name: string | null;
  avatar: string | null;
  verified: boolean | null;
  publicCardPacksCount: number | null;
  created: string | null;
  updated: string | null;
};
