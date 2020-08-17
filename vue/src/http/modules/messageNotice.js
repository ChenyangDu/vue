import axios from "../axios";
//消息通知
export const user = params => {
    return axios({
        url : '/message/user',
        method: 'get',
        params
    })
}

export const confirm = params => {
    return axios({
        url : '/message/confirm',
        method: 'post',
        params
    })
}
