import axios from "axios";


export const passRecoveryAPI = {
    passRecovery(data: {email: string, message: string}){
        return axios.post('https://neko-back.herokuapp.com/2.0/auth/forgot', data)
    },
}
