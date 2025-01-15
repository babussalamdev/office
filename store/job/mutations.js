export default {
  setState(state, data) {
    state[data.key] = data.value
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
  }
}
