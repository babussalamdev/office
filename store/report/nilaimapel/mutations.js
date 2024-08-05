export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  setMapel(state, data) {
    state.selectedMapel = ''
    state.santri = []
    state.mapel = data.mapel
  }
}
