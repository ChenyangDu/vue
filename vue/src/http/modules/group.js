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
export const info = params => {
    return axios({
        url: '/group/info',
        method: 'get',
        params
    })
}
export const document = params => {
  return axios({
    url:'/group/document',
    method:'get',
    params,
  })
}
export const create = data => {
  return axios({
    url:'/group/create',
    method:'post',
    data
  })
}
// 邀请加入
export const invite = params => {
    return axios({
        url : '/group/invite',
        method: 'post',
        params
    })
}
// 申请加入
export const applyGroup = params => {
  return axios({
    url: '/group/apply',
    method: 'post',
    params
  })
}
// 移除成员
export const kick = params => {
  return axios({
    url:'/group/kickass',
    method:'post',
    params,
  })
}
// 退出
export const drop = params => {
  return axios({
    url: '/group/drop',
    method: 'post',
    params
  })
}
// 解散
export const dismiss = params => {
  return axios({
    url: '/group/dismiss',
    method: 'post',
    params
  })
}


export const reply_invite = params => {
    return axios({
        url : '/group/reply/invite',
        method: 'post',
        params
    })
}

export const reply = params => {
    return axios({
        url : '/group/reply',
        method: 'post',
        params
    })
}

