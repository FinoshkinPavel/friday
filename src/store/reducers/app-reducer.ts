import { setLoggedIn } from "./auth-login-reduscer";
import { setUserInfo } from "./user-information-reducer";
import { authAPI } from "../../services/api/authAPI";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState: {
    isInitialized: false,
    error: null,
    status: "idle",
  } as InitialStateType,
  reducers: {
    setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized;
    },
    setError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setAppStatusRequest(
      state,
      action: PayloadAction<{ status: RequestStatusType }>
    ) {
      state.status = action.payload.status;
    },
  },
});

export const appReducer = slice.reducer;
export const { setIsInitialized, setError, setAppStatusRequest } =
  slice.actions;

//____________________Thunk_______________________

export const isInitializingMe = () => (dispatch: AppDispatch) => {
  authAPI
    .authMe()
    .then((res) => {
      dispatch(setUserInfo(res.data));
      dispatch(setLoggedIn({ loggedIn: true }));
    })
    //.catch((e) => utilsError(e, dispatch))
    .finally(() => {
      dispatch(setIsInitialized({ isInitialized: true }));
    });
};

//____________________Type________________________
type InitialStateType = {
  isInitialized: boolean;
  error: null | string;
  status: RequestStatusType;
};
