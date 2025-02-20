export default {
  setState(state, data) {
    state[data.key] = data.value
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
    state.selectedGedung = ''
    state.selectedRuang = ''
  },

  // Report
  inputToReport(state, data) {
    state.updateToReport = data
    $('#modalInputReport').modal('show')
  },
  inputReport(state, data) {
    const i = state.listLaporan.findIndex((x) => x.SK === data)
    state.listLaporan.splice(i, 1)
    $('#modalInputReport').modal('hide')
    $('#formInputReport')[0].reset()
  },
  deleteReport(state, data) {
    const i = state.listLaporan.findIndex((x) => x.SK === data)
    state.listLaporan.splice(i, 1)
  },

  // activity
  updateToActivity(state, data) {
    const datas = state.activity.find((x) => x.SK === data)
    state.updateToActivity = datas
    $('#modalUpdateActivity').modal('show')
  },
  addActivity(state, data) {
    state.activity.push(data)
    $('#modalAddActivity').modal('hide')
    $('#formAddActivity')[0].reset()
    state.selectedGedung = ''
    state.selectedRuang = ''
  },
  updateActivity(state, data) {
    const i = state.activity.findIndex((x) => x.SK === data.SK)
    state.activity[i].Timestamp.menunggu = data.Timestamp.menunggu
    state.activity[i].PIC = data.PIC
    $('#modalUpdateActivity').modal('hide')
    $('#formUpdateActivity')[0].reset()
  },
}
