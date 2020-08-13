import axios from "../axios";
/*
团队相关
 */
export const member = params => {
    return axios({
        url: '/group/member',
        method: 'get',
        params
    })
}

export const kick = params => {
    return axios({
        url:'/group/kickass',
        method:'post',
        params,
    })
}