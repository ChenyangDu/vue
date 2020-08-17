export default {
  state: {
    groupnumber: null
  },
  getter: {},
  mutations: {
    toDetail(state, data){
      state.groupnumber = data
    }
  }
}
