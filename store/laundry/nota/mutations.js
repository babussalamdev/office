export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  btn(state) {
    state.btn = !state.btn
  },
  setPage(state, data) {
    state.datas = data
  },
  setAddNota(state, data) {
    const lastThreeDigits = data.SK.split('#')[1].slice(-3);
    const datas = {}
    datas['Chart'] = lastThreeDigits
    datas['SK'] = data.SK

    state.datas.push(datas)

    $('#laundryNotaModalAdd').modal('hide')
  },
  setGetDetail(state, data) {
    state.datasDetail = data
  },
  setDataFromTag(state, data) {
    state.dataFromTag = data
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
