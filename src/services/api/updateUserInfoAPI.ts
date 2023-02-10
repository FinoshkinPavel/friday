import {
  UpdateUserInfoResponse,
  UpdateUserName,
} from "../../types/api-types/api-types";
import { instance } from "./axiosInstance/axiosInstance";

export const updateUserInfoAPI = {
  changeUserName(data: UpdateUserName) {
    return instance.put<UpdateUserInfoResponse>("auth/me", data);
  },
};
