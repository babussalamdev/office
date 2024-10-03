export default {
  setState(state, data) {
    if ( data.key === 'kelas') {
      state[data.key] = data.value
      state.santri = []
      state.selectedMapel = ''
      state.selectedKelas = ''
      state.mapel = ''
    } else {
      state[data.key] = data.value
    }
  },
  setMapel(state, data) {
    state.selectedMapel = ''
    state.santri = []
    state.mapel = data.mapel
  }
}
