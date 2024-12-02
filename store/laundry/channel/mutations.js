export default {
  setPage(state, data) {
    state.datas = data
  },
  setState(state, data) {
    state[data.key] = data.value
  },
  btn(state) {
    state.btn = !state.btn
  },
  addData(state, data) {
    state.datas.unshift(data)
    $('#laundryChannelAdd').modal('hide')
    $('#formLaundryChannelAdd')[0].reset()
    state.type = ''
  },
  editItem(state, value) {
    const i = state.datas.findIndex((x) => x.SK === value)
    $("#laundryChannelEdit").modal("show");
    state.updateData = state.datas[i];
  },
  updateData(state, value) {
    const i = state.datas.findIndex((x) => x.SK === value.SK)

    const data = state.datas[i]
    data.Name = value.Name
    data.Category = value.Category
    data.Contact = value.Contact
    data.Address = value.Address
    data.Note = value.Note

    $("#formLaundryChannelEdit")[0].reset()
    $("#laundryChannelEdit").modal("hide");

    state.updateData = ''
    state.type = ''
  },
  deleteItem(state, value) {
    const i = state.datas.findIndex((x) => x.SK === value);
    state.datas.splice(i, 1);
  },
}
