export default {
  setState(state, data) {
    if (data.key === 'listGedung') {
      state.ruangan = []
      state.selectedGedung = ''
      state[data.key] = data.value
    } else if (data.key === 'options') {
      const result = data.value.map((item, index) => ({
        name: item.SK,
        code: index + 1
      }));
      state[data.key] = result
    } else {
      state[data.key] = data.value
    }
  },
  btn(state) {
    state.btn = !state.btn
  },
  setInput(state, data) {
    state.value = []
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
  },

  // update
  updateData(state, data) {
    const i = state.ruangan.findIndex((x) => x.SK === data)
    state.updateData = state.ruangan[i]
    $('#ruanganModalUpdate').modal('show')
  },
  updateRuangan(state, data) {
    const i = state.ruangan.findIndex((x) => x.SK === data.SK)
    const datas = state.ruangan[i]
    datas.Job = data.Job

    state.value = []
    state.updateData = ''
    $('#ruanganModalUpdate').modal('hide')
  },

  // reset
  resetUpdateData(state) {
    state.value = []
    state.updateData = ''
  }
}
