export default {
  setState(state, data) {
    if (data.key === 'selectedMode') {
      state.selectedGedung = ''
      state.selectedCrew = ''
      state.listLaporan = []
      state[data.key] = data.value
    } else {
      state[data.key] = data.value
    }
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
    state.selectedCrew = ''
    state.selectedMode = ''
    state.selectedGedung = ''
  }
}
