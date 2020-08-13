import axios from "@/http/axios";

// 请求文章权限
export const authority = params => {
  return axios({
    url: '/authority',
    method: 'get',
    params
  })
}
