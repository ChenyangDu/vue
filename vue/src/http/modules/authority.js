import axios from "@/http/axios";

// 请求文章权限
export const authority = params => {
  return axios({
    url: '/authority',
    method: 'get',
    params
  })
}

// 设置分享的权限 通过链接所有人可看/可评论/可编辑
export const shareAuthority = params => {
  return axios({
    url: '/authority/share',
    method: 'get',
    params
  })
}

// 基于某文档针对某用户设置权限
export const setUserAuthority = params => {
  return axios({
    url: '/authority/setuser',
    method: 'get',
    params
  })
}
