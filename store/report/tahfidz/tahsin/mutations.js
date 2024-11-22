export default {
  setState(state, data) {
    if ( data.key === 'listKelas') {
      state.selectedKelas = ''
      state.santri = []
      state[data.key] = data.value
    } else {
      state[data.key] = data.value
    }
  }
}
