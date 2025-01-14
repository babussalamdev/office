export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  btn(state) {
    state.btn = !state.btn
  },

  //
  setInputData(state, data) {
    state.datas.push(data)
    $('#gedungModal').modal('hide')
    $('#gedungForm')[0].reset()
  },
  deleteItem(state, data) {
    const i = state.datas.findIndex((x) => x.SK === data)
    state.datas.splice(i, 1)
  },
  updateItem(state, data) {
    const i = state.datas.findIndex((x) => x.SK === data.sk)
    state.datas[i].Status = data.changeStatus
  }
}
