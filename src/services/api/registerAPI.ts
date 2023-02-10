import {RegisteredParamsType} from "../../types/api-types/api-types";
import { instance } from "./axiosInstance/axiosInstance";



export const registerAPI = {
    registered(data: RegisteredParamsType) {
        return instance.post('auth/register', data)
    },
}
