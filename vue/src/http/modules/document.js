import axios from "../axios";

// 上传文档
export const save = data => {
  return axios({
    url: '/document/save',
    method: 'post',
    data
  })
}
