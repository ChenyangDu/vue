import Vue from 'vue'
import vuex from 'vuex'

import user from './modules/user'
import groupId from "./modules/groupId";

import createPersistedPlugin from "@/store/createPersistedPlugin";
const persistedPlugin = createPersistedPlugin()

Vue.use(vuex)

const store = new vuex.Store({
  modules: {
    user: user,
    groupId: groupId
  },
  plugins: [persistedPlugin]
})

export default store
