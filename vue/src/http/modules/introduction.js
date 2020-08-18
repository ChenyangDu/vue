import axios from "../axios";

export const info = params => {
    return axios({
        url:'/introduction/view',
        method:'get',
        params
    })
}

export const save = (params,data) => {
    return axios({
        url:'/introduction/save',
        method:'post',
        params,
        data
    })
}
