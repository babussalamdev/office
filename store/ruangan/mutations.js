export default {
  setState(state, data) {
    if (data.key === 'listGedung') {
      state.ruangan = []
      state.selectedGedung = ''
      state[data.key] = data.value
    } else {
      state[data.key] = data.value
    }
  },
  btn(state) {
    state.btn = !state.btn
  },
  setInput(state, data) {
    state.ruangan.push(data)
    $('#ruanganModal').modal('hide')
    $('#ruanganForm')[0].reset()
  },
  deleteItem(state, data) {
    const i = state.ruangan.findIndex((x) => x.SK === data)
    state.ruangan.splice(i, 1)
  },
  updateItem(state, data) {
    const i = state.ruangan.findIndex((x) => x.SK === data.sk)
    state.ruangan[i].Status = data.changeStatus
  }
}
