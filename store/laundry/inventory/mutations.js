export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  setPage(state, data) {
    state.datas = data
  },
  btn(state) {
    state.btn = !state.btn
  },
  addData(state, data) {
    state.datas.unshift(data)
    $('#laundryInventoryModal').modal('hide')
    $('#formInventoryModal')[0].reset()
  }
}
