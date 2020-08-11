import axios from "../axios";

/*
 * 用户信息模块
 */

// 获取用户信息
export const info = params => {
  return axios({
    url: '/user/info',
    method: 'get',
    params
  })
}
// 保存用户信息
export const save = data => {
  return axios({
    url: '/user/save',
    method: 'post',
    data
  })
}
// 请求用户的团队列表
export const group = params => {
  return axios({
    url: '/user/group',
    method: 'get',
    params
  })
}
// 请求用户的创建文档列表
export const own = params => {
  return axios({
    url: '/user/own',
    method: 'get',
    params
  })
}
// 请求用户的收藏文档列表
export const favorite = params => {
  return axios({
    url: '/user/favorite',
    method: 'get',
    params
  })
}
// 请求用户的最近浏览文档列表
export const recent = params => {
  return axios({
    url: '/user/recent',
    method: 'get',
    params
  })
}
