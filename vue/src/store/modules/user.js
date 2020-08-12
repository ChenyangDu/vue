export default {
  state: {
    // username: localStorage.getItem('username') == null ? '' : JSON.parse(localStorage.getItem('username' || '[]'))
    username: 12
  },
  getters: {},
  mutations: {
    login(state, data) {
      state.username = data
      window.localStorage.setItem('username', JSON.stringify(data))
    },
    logout(state) {
      state.username = ''
      window.localStorage.removeItem('username')
    }
  },
  action: {}
}
