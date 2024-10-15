export default {
  setState(state, data) {
    if ( data.key === 'kelas') {
      state.santri = []
      state.selectedKelas = ''
      state[data.key] = data.value
    } else {
      state[data.key] = data.value
    }
  }
}
