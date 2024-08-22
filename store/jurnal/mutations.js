export default {
  setState(state, data) {
    if ( data.key === 'datas') {
      state.values = []
      state.selectedMapel = ''
      state.selectedKelas = ''
      state[data.key] = data.value
    } else if ( data.key === 'reset') {
      state.values = []
      state.selectedMapel = ''
    } else {
      state[data.key] = data.value
    }
  },
  btn(state) {
    state.btn = !state.btn
  },
  editItem(state, data) {
    const i = state.values.findIndex((x) => x.SK === data)
    state.updateData = state.values[i]

    $('#updateModalJurnal').modal('show')
  },
  setValues(state, data) {
    state.values.push(data)

    $('#inputModalJurnal').modal('hide')
    $('#modalInput')[0].reset()
  },
  updateValues(state, data) {
    const i = state.values.findIndex((x) => x.SK === state.updateData.SK)
    const datas = state.values[i]
    datas.Description = data.Description
    datas.Occurrence = data.Occurrence

    $('#updateModalJurnal').modal('hide')
  },
}
