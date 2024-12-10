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
    // const lastThreeDigits = data.SK.split('#')[1].slice(-3);
    // const datas = {}
    // datas['Chart'] = lastThreeDigits
    // datas['SK'] = data.SK

    state.datas.push(data)
    $('#laundrySettingKeranjangModalAdd').modal('hide')
    $('#formSettingKeranjangModalAdd')[0].reset()
  },
}
