import axios from "../axios";

//创建文档
export const create = params => {
  return axios({
    url: '/document/create',
    method: 'get',
    params
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
// 请求文档具体内容
export const view = params => {
  return axios({
    url: '/document/view',
    method: 'get',
    params
  })
}
//文档开始被编辑
export const start = params => {
  return axios({
    url: '/document/edit/start',
    method: 'get',
    params
  });
}
// 文章结束被编辑
export const end = (params, data) => {
  return axios({
    url: '/document/edit/end',
    method: 'post',
    params,
    data
  });
}
//删除文档
export const deleteDoc = params => {
  return axios({
    url: '/document/delete',
    method: 'get',
    params
  })
}
//收藏信息
export const favoriteinfo = params => {
  return axios({
    url: '/document/favoriteinfo',
    method: 'get',
    params
  })
}
// 收藏文档
export const favorite = params => {
  return axios({
    url: '/document/favorite',
    method: 'get',
    params
  })
}
//回收站列表
export const recycle = params => {
  return axios({
    url: '/document/recycle',
    method: 'get',
    params
  })
}
//恢复回收站里的文档
export const recover =  params => {
  return axios({
    url: '/document/recover',
    method: 'get',
    params
  })
}

export const remove = params => {
  return axios({
    url: 'document/remove',
    method: 'get',
    params
  })
}

// 修改文章标题
export const rename = params => {
  return axios({
    url: 'document/rename',
    method: 'get',
    params
  })
}
