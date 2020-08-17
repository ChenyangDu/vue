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

export const kick = params => {
    return axios({
        url:'/group/kickass',
        method:'post',
        params,
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

export const invite = params => {
    return axios({
        url : '/group/invite',
        method: 'post',
        params
    })
}

export const applyGroup = params => {
  return axios({
    url: '/group/apply',
    method: 'post',
    params
  })
}

export const drop = params => {
  return axios({
    url: '/group/drop',
    method: 'post',
    params
  })
}

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

export const reply_apply = params => {
    return axios({
        url : '/group/reply/apply',
        method: 'post',
        params
    })
}

