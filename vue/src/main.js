import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from '@/utils/global'
import './plugins/element.js'
import api from './http'
import axios from 'axios'
// 引入 Element UI
import ElementUI from "element-ui";
// 单独引入样式文件
import "element-ui/lib/theme-chalk/index.css";

// 执行 ElementUI
Vue.use(ElementUI, { size: "small", zIndex: 3000 });

Vue.config.productionTip = false
Vue.use(api)
axios.defaults.baseURL = 'http://localhost:8081'
Vue.prototype.$http = axios
Vue.prototype.global = global

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
