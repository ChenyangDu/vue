import axios from '../axios'

// 请求文章评论列表
export const list = params => {
  return axios({
    url: '/comment/list',
    method: 'get',
    params
  })
}
// 提交评论
export const create = data => {
  return axios({
    url: '/comment/create',
    method: 'post',
    data
  })
}
