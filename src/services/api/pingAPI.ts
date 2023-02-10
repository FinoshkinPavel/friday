import {instance} from "./axiosInstance/axiosInstance";


export const pingAPI = {
    ping() {
        return instance.get('ping')
    },
}
