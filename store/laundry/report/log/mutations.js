export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  setPage(state, data) {
    state.datas = data
  }
}
