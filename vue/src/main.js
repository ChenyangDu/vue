import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from '@/utils/global'
import api from './http'
import axios from 'axios'

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueClipboard from 'v-clipboard'

Vue.use(VueClipboard)
Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(ElementUI);
// , { size: "small", zIndex: 3000 }
Vue.use(api)

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:8081'

Vue.prototype.$http = axios

Vue.prototype.global = global

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
