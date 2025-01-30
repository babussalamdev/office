export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  showModalNote(state, data) {
    $('#note').modal('show')
  },
  resetLaporan(state, data) {
    state.decodedText = ''
    $('#note').modal('hide')
    $('#noteForm')[0].reset()
  },
  btn(state) {
    state.btn = !state.btn
  },
  resetData(state) {
    state.listLaporan = []
    state.selectedGedung = ''
    state.selectedRuang = ''
  }
}
