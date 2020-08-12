import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from '@/utils/global'
import './plugins/element.js'
import api from './http'
// import tinymce from 'tinymce/tinymce'
// import 'tinymce/themes/silver/theme'
// import Editor from '@tinymce/tinymce-vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.use(api)
Vue.use(Antd)

Vue.prototype.global = global
/**
 * 获取当前时间
 * 格式YYYY-MM-DD
 */
Vue.prototype.getNowFormatDate = function() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":"
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var strHour = date.getHours();
  var strMinute = date.getMinutes();
  var strSec = date.getSeconds();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate + " " + strHour + seperator2 + strMinute + seperator2 + strSec;
  return currentdate;
};


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
