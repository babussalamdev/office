export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  btn(state) {
    state.btn = !state.btn
  },
  setPage(state, data) {
    state.datas = data
    state.chart = false
  },
  setAddNota(state, data) {
    state.chart = true
    state.datasDetail = data.dataChart
    const identity = data.Chart.replace('#', '%23')
    this.$router.push(`/laundry/nota/${identity}`)
  },
  setGetDetail(state, data) {
    state.datasDetail = ''
    state.datasDetail = data
  },
  setDataFromTag(state, data) {
    state.dataFromTag = data
  },
  addDataPerSantri(state) {
    state.chart = false
    state.dataFromTag = ''
    state.tag = ''
    state.qty = 0
  },
  deleteItem(state, sk) {
    const i = state.datasDetail.findIndex((x) => x.SK === sk)
    state.datasDetail.splice(i, 1)
  },

  // debounce
  CLEAR_TIMEOUT(state) {
    if (state.timeout) {
      clearTimeout(state.timeout);
      state.timeout = null;
    }
  },
  SET_TIMEOUT(state, timeout) {
    state.timeout = timeout;
  },
}
