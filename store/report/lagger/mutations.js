export default {
  setState(state, data) {
    if (data.key === 'kelas') {
      state[data.key] = data.value
      state.santri = ''
      state.mapelSelect = []
      state.quranSelect = []
      state.selectedQuran = ''
      state.selectedMapel = ''
      state.selectedKelas = ''
    } else {
      state[data.key] = data.value
    }
  },
  resetUnWalas(state) {
    state.santri = ''
    state.mapelSelect = []
    state.quranSelect = []
    state.selectedQuran = ''
    state.selectedMapel = ''
    state.selectedKelas = ''
  }
}
