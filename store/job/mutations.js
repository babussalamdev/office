export default {
  setState(state, data) {
    if (data.key === 'listGedung') {
      state.job = []
      state.selectedGedung = ''
      state[data.key] = data.value
    } else {
      state[data.key] = data.value
    }
  },
  btn(state) {
    state.btn = !state.btn
  },

  //
  setData(state, data) {
    state.job = data.job
    state.pegawai = data.pegawai
    state.ruangan = data.ruangan
  },
  inputData(state, data) {
    state.job.push(data)
    $('#jobModal').modal('hide')
    $('#jobForm')[0].reset()
  },
  updateData(state, data) {
    const i = state.job.findIndex((x) => x.SK === data.SK && x.PK === data.PK)
    state.job[i].Name = data.Name
    $('#jobModalUpdate').modal('hide')
  },
  deleteItem(state, sk) {
    const i = state.job.findIndex((x) => x.SK === sk)
    state.job.splice(i, 1)
  },

  //
  updateItem(state, data) {
    const i = state.job.findIndex((x) => x.PK === data)
    state.updateData = state.job[i]
    $('#jobModalUpdate').modal('show')
  },
}
