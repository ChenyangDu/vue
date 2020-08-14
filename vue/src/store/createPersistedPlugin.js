export default function createPersistedPlugin(options = { key: 'store' }) {
  return store => {
    // 1. 判断`sessionStorage`中是否有`Vuex`快照
    let localStore = JSON.parse(localStorage.getItem(options.key))
    // 若无，则使用初始值, 否则使用快照的值
    localStore && store.replaceState(localStore)
    // 临时工，用完就解雇了～
    localStore = null
    // 2. 监听`Vuex`中`mutation`的变化
    store.subscribe((mutation, state) => {
      // 3. 动态存储`Vuex`快照至`sessionStorage`中
      localStorage.setItem(options.key, JSON.stringify(state))
    })
  }
}
