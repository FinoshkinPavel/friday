import { Dispatch } from "redux";
import { utilsError } from "../../utils/error-utils";
import { passRecoveryAPI } from "../../services/api/passRecoveryAPI";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: initialStateType = {
  email: null,
  sendMessageStatus: "idle",
  sendMessage: false,
};

const slice = createSlice({
  name: "passRec",
  initialState,
  reducers: {
    setEmailFromRecoveryPass(state, action: PayloadAction<{ email: string }>) {
      state.email = action.payload.email;
    },
    sendMessage(state, action: PayloadAction<{ value: boolean }>) {
      state.sendMessage = action.payload.value;
    },
    changeSendMessageStatus(
      state,
      action: PayloadAction<{ status: SendMessageStatusRequest }>
    ) {
      state.sendMessageStatus = action.payload.status;
    },
  },
});

export const passwordRecoveryReducer = slice.reducer;
export const {
  setEmailFromRecoveryPass,
  sendMessage,
  changeSendMessageStatus,
} = slice.actions;

//_____________Thunk_______________
export const sendInstructionForNewPass =
  (email: string) => (dispatch: Dispatch) => {
    const message = `<div style="padding: 15px">password recovery link:<a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`;
    dispatch(changeSendMessageStatus({ status: "sending" }));
    dispatch(sendMessage({ value: true }));
    dispatch(setEmailFromRecoveryPass({ email }));
    passRecoveryAPI
      .passRecovery({ email, message })
      .then((res) => {
        dispatch(changeSendMessageStatus({ status: "sent" }));
      })
      .catch((e) => {
        utilsError(e, dispatch);
        dispatch(changeSendMessageStatus({ status: "notSend" }));
      });
  };
//_____________Type________________
type SendMessageStatusRequest = "sending" | "sent" | "notSend" | "idle";

type initialStateType = {
  email: string | null;
  sendMessageStatus: SendMessageStatusRequest;
  sendMessage: boolean;
};
