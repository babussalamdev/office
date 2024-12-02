export default {
  setPage(state, data) {
    state.datas = data
  },
  setState(state, data) {
    state[data.key] = data.value
  }
}
