export default {
  setState(state, data) {
    if ( data.key === 'details') {
      const sortedData = data.value.sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt));
      state[data.key] = sortedData
    } else if ( data.key === 'kelas') {
      state.selectedKelas = ''
      state.santri = []
      state[data.key] = data.value
    } else {
      state[data.key] = data.value
    }
  },
  resetPage(state) {
    state.start = ''
    state.end = ''
    state.santri = []
  }
}
