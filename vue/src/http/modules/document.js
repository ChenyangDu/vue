import axios from "../axios";

//创建文档
export const create = params => {
  return axios({
    url: '/document/create',
    method: 'get',
    params
  })
}
// 保存文档
export const save = data => {
  return axios({
    url: '/document/save',
    method: 'post',
    data
  })
}
// 请求文档信息
export const info = params => {
  return axios({
    url: '/document/info',
    method: 'get',
    params
  })
}
// 请求文档内容
export const view = params => {
  return axios({
    url: '/document/view',
    method: 'get',
    params
  })
}
