import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import global from '@/utils/global'
import './plugins/element.js'
import api from './http'

Vue.config.productionTip = false
Vue.use(api)

Vue.prototype.global = global

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
