export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  setPage(state, data) {
    state.datas = data
    state.authority = data[0].Authority
  },
  changeAuthority(state, data) {
    const i = state.datas.findIndex((x) => x.SK === data.sk)
    state.datas[i].Authority = { ...state.datas[i].Authority, [data.type]: data.value };
  },
}
