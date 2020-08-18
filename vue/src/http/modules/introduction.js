import axios from "../axios";

/*
个人简介相关
 */
export const view = params => {
  return axios({
    url: '/introduction/view',
    method: 'get',
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
