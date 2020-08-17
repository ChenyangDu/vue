import axios from "@/http/axios";

/*
 * 搜索模块
 */

// 根据手机号或者邮箱搜索用户（用于添加协作者或邀请成员等）
export const searchTheUser = params => {
  return axios({
    url: '/search/user',
    method: 'get',
    params
  })
}

// 根据文章标题的关键字搜索/id搜索
export const searchDoc = params => {
  return axios({
    url: '/search/document',
    method: 'get',
    params
  })
}

// 根据关键字搜索团队
export const searchGroup = params => {
  return axios({
    url: '/search/group',
    method: 'get',
    params
  })
}
