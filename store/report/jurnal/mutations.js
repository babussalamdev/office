export default {
  setState(state, data) {
    if ( data.key === 'listMapel') {
      state.values = []
      state.selectedMapel = ''
      state[data.key] = data.value
    } else if ( data.key === 'listKelas') {
      state.selectedMapel = ''
      state.selectedKelas = ''
      state.listMapel = []
      state.values = []
      state[data.key] = data.value
      console.log(state.listKelas)
    } else {
      state[data.key] = data.value
    }
  }
}
