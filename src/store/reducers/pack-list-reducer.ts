import { packListAPI } from "../../services/api/packListAPI";
import {
  NewPackListDataType,
  PacksListType,
  RequestPackListUriParamType,
  UpdatePackListDataType,
} from "../../types/api-types/api-types";
import { AppDispatch, StoreType } from "../store";
import { setAppStatusRequest } from "./app-reducer";
import { utilsError } from "../../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  packsList: PacksListType;
  packsListUser_id: string;
};
const initialState: InitialStateType = {
  packsList: {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 100,
    minCardsCount: 0,
    pageCount: 0,
    page: 0,
  },
  packsListUser_id: "",
};

const slice = createSlice({
  name: "packList",
  initialState,
  reducers: {
    setPacksList(state, action: PayloadAction<PacksListType>) {
      state.packsList = action.payload;
    },
    setPacksListUserIdAC(
      state,
      action: PayloadAction<{ packsListUser_id: string }>
    ) {
      state.packsListUser_id = action.payload.packsListUser_id;
    },
  },
});

export const packListReducer = slice.reducer;
export const { setPacksList, setPacksListUserIdAC } = slice.actions;

export const getPacksList =
  (data: RequestPackListUriParamType) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusRequest({ status: "loading" }));
    packListAPI
      .getAllPacksList(data)
      .then((res) => {
        dispatch(setPacksList(res.data));
      })
      .finally(() => {
        dispatch(setAppStatusRequest({ status: "idle" }));
      });
  };

export const addNewPack =
  (data: NewPackListDataType) =>
  (dispatch: AppDispatch, getState: () => StoreType) => {
    dispatch(setAppStatusRequest({ status: "loading" }));
    packListAPI
      .addNewPack(data)
      .then((res) => {
        const user_id = getState().packList.packsListUser_id;
        if (user_id.length) {
          dispatch(getPacksList({ user_id }));
        } else {
          dispatch(getPacksList({}));
        }
        dispatch(setAppStatusRequest({ status: "succeeded" }));
      })
      .catch((e) => {
        utilsError(e, dispatch);
      });
  };

export const updatePackList =
  (data: UpdatePackListDataType) =>
  (dispatch: AppDispatch, getState: () => StoreType) => {
    dispatch(setAppStatusRequest({ status: "loading" }));
    packListAPI
      .updatePackList(data)
      .then((res) => {
        const user_id = getState().packList.packsListUser_id;
        if (user_id.length) {
          dispatch(getPacksList({ user_id }));
        } else {
          dispatch(getPacksList({}));
        }
        dispatch(setAppStatusRequest({ status: "succeeded" }));
      })
      .catch((e) => {
        utilsError(e, dispatch);
      });
  };

export const deletePackList =
  (packId: string) => (dispatch: AppDispatch, getState: () => StoreType) => {
    dispatch(setAppStatusRequest({ status: "loading" }));
    packListAPI
      .deletePackList(packId)
      .then((res) => {
        const user_id = getState().packList.packsListUser_id;
        if (user_id.length) {
          dispatch(getPacksList({ user_id }));
        } else {
          dispatch(getPacksList({}));
        }
        dispatch(setAppStatusRequest({ status: "succeeded" }));
      })
      .catch((e) => {
        utilsError(e, dispatch);
      });
  };
