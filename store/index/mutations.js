export default {
  setUnit(state, value) {
    state.unit = value?.program
    state.pengajar = value?.result.Pengajar
    state.pengampu = value?.result.Pengampu
    state.personalia = value?.result.Personalia
    state.permissions = value?.result?.Permissions?.split(',')
  },
  root(state) {
    state.unit = 'root'
    state.permissions = 'root'
  },
  removeAll(state) {
    state.unit = ''
    state.permissions = ''
    state.pengajar = ''
    state.pengampu = ''
    state.personalia = ''
  },
  globalLoad(state) {
    state.globalLoad = state.globalLoad ? false : true
  },
}
