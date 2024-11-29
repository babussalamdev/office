export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  editDataLaundry(state, data) {
    const datas = state.dummyData.find((x) => x.Nama === data)
    state.updateData = datas
    $('#laundryModalEdit').modal('show')
  },
  resetEditData(state) {
    state.updateData = ''
  },
  btn(state) {
    state.btn = !state.btn
  },
  addDataLaundry() {
    $('#laundryModalAdd').modal('show')
  },
  setData() {
    $('#laundryModalAdd').modal('hide')
    $('#formModalAdd')[0].reset()
  }
}
