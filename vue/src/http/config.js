import {
  baseUrl
} from "@/utils/global";

export default {
  method: 'get',
  baseUrl: baseUrl,
  header: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data: {},
  withCredentials: true,
  responseType: 'json'
}
