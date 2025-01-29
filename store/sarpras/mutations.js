export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  btn(state) {
    state.btn = !state.btn
  },
  editJabatan(state, data) {
    const i = state.datas.findIndex((x) => x.SK === data)
    const program = localStorage.getItem('program')
    const object = {
      Jabatan: state.datas[i].Jabatan[program],
      Username: state.datas[i].Username,
      SK: state.datas[i].SK
    }
    state.updateData = object
    $('#modalSarpras').modal('show')
  },
  updatePegawaiJabatan(state, value) {
    const i = state.datas.findIndex((x) => x.SK === value.SK)

    const data = state.datas[i]
    data['Jabatan'] = value.Jabatan
    state.updateData = ''

    $("#formUpdateSarpras")[0].reset()
    $("#modalSarpras").modal("hide");
  },

}
