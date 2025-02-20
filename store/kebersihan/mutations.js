export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  btn(state) {
    state.btn = !state.btn
  },
  resetData(state) {
    state.listJob = []
  },
  doneItem(state, data) {
    const i = state.listJob.findIndex((x) => x.SK === data)
    state.listJob.splice(i, 1)
  },
  failedItem(state, data) {
    const i = state.listJob.findIndex((x) => x.SK === data)
    state.listJob.splice(i, 1)
    $('#kebersihanModal').modal('hide')
    $('#kebersihanForm')[0].reset()
    state.updateData = ''
  },
  updateData(state, sk) {
    const data = state.listJob.find((x) => x.SK === sk)
    state.updateData = data
    $('#kebersihanModal').modal('show')
  }
}
