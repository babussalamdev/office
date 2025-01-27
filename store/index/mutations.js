export default {
  setUnit(state, value) {
    state.unit = value?.program
    state.pengajar = value?.result.Pengajar
    state.pengampu = value?.result.Pengampu
    state.personalia = value?.result.Personalia
    state.personaliaKerumahtanggaan = value?.result.Personalia_Kerumahtanggaan
    state.personaliaSarpras = value?.result.Personalia_Sarpras
    state.permissions = value?.result?.Permissions ? value?.result?.Permissions?.split(',') : ''
    state.label = value?.result?.Label
    state.semester = value?.result?.Semester
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
    state.label = ''
    state.semester = ''
    state.personaliaKerumahtanggaan = ''
    state.personaliaSarpras = ''
  },
  globalLoad(state) {
    state.globalLoad = state.globalLoad ? false : true
  },
}
