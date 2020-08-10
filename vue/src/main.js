// main.js
import Vue from "vue";
import md5 from "js-md5";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, Form, Field, Toast } from "vant";
import "lib-flexible/flexible";

Vue.use(Form).use(Field).use(Toast).use(Button);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

Vue.prototype.$md5 = md5;