import {RegisteredParamsType, UserInfoResponse} from "../../types/api-types/api-types";
import {instance} from "./axiosInstance/axiosInstance";




export const authAPI = {
    authMe() {
        return instance.post('auth/me')
    },
    logIn(data: RegisteredParamsType) {
        return instance.post<UserInfoResponse>('auth/login', data)
    },
    logOut() {
        return instance.delete<UserInfoResponse>('auth/me')
    },
}



