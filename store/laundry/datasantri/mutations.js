export default ({
  setState(state, data) {
    state[data.key] = data.value
  },
  setPage(state, data) {
    state.datas = data
  },
  editItem(state, data) {
    const i = state.datas.findIndex((x) => x.SK === data.SK)
    state.datas[i].Status = data.Status
  }
})
