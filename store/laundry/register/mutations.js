export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  setPage(state, data) {
    state.listAsrama = data
    state.datas = []
    state.selectedAsrama = ''
  },
  setGetData(state, data) {
    state.datas = data
  },
  editRegisterLaundry(state, id) {
    const data = state.datas.find((x) => x.BagID === id)
    if ( data.Status === 'active' || data.Status === 'lost') {
      state.updateData = data
      $('#laundryRegisterModal').modal('show')
    }
  },
  resetUpdateData(state) {
    state.updateData = ''
  },
  btn(state) {
    state.btn = !state.btn
  },
  updateData(state, value) {
    const i = state.datas.findIndex((x) => x.BagID === state.updateData.BagID)
    console.log(i)
    state.datas[i].Status = value.Status
    $('#laundryRegisterModal').modal('hide')
    $('#formRegisterUpdate')[0].reset()
    state.updateData = ''
  }
}
