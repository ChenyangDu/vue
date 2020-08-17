import Vue from 'vue'
import vuex from 'vuex'

import user from './modules/user'
import groupId from "./modules/groupId";

import createPersistedPlugin from "@/store/createPersistedPlugin";
const persistedPlugin = createPersistedPlugin()

Vue.use(vuex)

const store = new vuex.Store({
  state: {
    groupNumber: ''
  },
  modules: {
    user: user,
    groupId: groupId
  },
  mutations:{
    toDetail(state, data) {
      state.groupNumber = data
    }
  },
  plugins: [persistedPlugin]
})

export default store
