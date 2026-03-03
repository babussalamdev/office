export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  updateList(state, data) {
    const i = state.list.findIndex((x) => x.SK === data.sk)
    state.list[i].Status = data.status
  }
}
