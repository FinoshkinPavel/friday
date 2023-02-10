import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import { setAppStatusRequest, setError } from "../store/reducers/app-reducer";

export const utilsError = (
  e: Error | AxiosError<{ error: string }>,
  dispatch: Dispatch
) => {
  const err = e as Error | AxiosError<{ error: string }>;
  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message;
    dispatch(setError({ error }));
    dispatch(setAppStatusRequest({ status: "failed" }));
  } else {
    dispatch(setError({ error: err.message }));
    dispatch(setAppStatusRequest({ status: "failed" }));
  }
};
