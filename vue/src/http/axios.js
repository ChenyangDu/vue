import axios from 'axios'
import config from "./config";
import router from "../router";
import store from "../store";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
var _this = this

export default function $axios(options){
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: config.header,
      withCredentials: config.withCredentials
    })
    // request 请求拦截器
    // instance.interceptors.request.use(
    //   config => {
    //     let token = this.$store.state.user.username
    //     if (token) {
    //       config.headers.token = token
    //     } else {
    //       router.push('/login')
    //     }
    //     return config
    //   },
    //   error => {
    //     console.log('request', error)
    //     router.push('/404')
    //     return Promise.reject(error)
    //   }
    // )

    // response 响应拦截器
    instance.interceptors.response.use(
      response => {
        return response.data
      },
      error => {
        // console.error(err)
        if (error) {
          store.commit('logout')
          // router.replace('/login')
        }
        return Promise.reject(error)
      }
    )
    //请求处理
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}

// const _axios = axios.create(config);
//
// _axios.interceptors.request.use(
//   function(config) {
//     // Do something before request is sent
//     return config;
//   },
//   function(error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );
//
// // Add a response interceptor
// _axios.interceptors.response.use(
//   function(response) {
//     // Do something with response data
//     return response;
//   },
//   function(error) {
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );
//
// Plugin.install = function(Vue, options) {
//   Vue.axios = _axios;
//   window.axios = _axios;
//   Object.defineProperties(Vue.prototype, {
//     axios: {
//       get() {
//         return _axios;
//       }
//     },
//     $axios: {
//       get() {
//         return _axios;
//       }
//     },
//   });
// };
//
// Vue.use(Plugin)
//
// export default Plugin;
