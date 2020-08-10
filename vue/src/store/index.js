import Vue from 'vue'
import vuex from 'vuex'

import user from './modules/user'

Vue.use(vuex)

const store = new vuex.Store({
  modules: {
    user: user
  }
})

export default store
