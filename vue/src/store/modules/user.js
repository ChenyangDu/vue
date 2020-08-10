export default {
  state: {
    username: sessionStorage.getItem('username') == null ? '' : JSON.parse(sessionStorage.getItem('username' || '[]'))
  },
  getters: {},
  mutations: {
    login(state, data) {
      state.username = data
      window.sessionStorage.setItem('username', JSON.stringify(data))
    },
    logout(state) {
      state.username = ''
      window.sessionStorage.removeItem('username')
    }
  },
  action: {}
}
