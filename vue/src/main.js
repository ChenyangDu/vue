import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from '@/utils/global'
import './plugins/element.js'
import api from './http'
import axios from 'axios'

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
