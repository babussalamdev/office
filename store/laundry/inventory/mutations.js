export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  setPage(state, data) {
    state.datas = data.responseDB
    const supplier = data.responseDB2.map((item) => item.Name)
    state.supplier = supplier
  },
  btn(state) {
    state.btn = !state.btn
  },
  addData(state, data) {
    state.datas.unshift(data)
    $('#laundryInventoryModal').modal('hide')
    $('#formInventoryModal')[0].reset()
  },
  editItem(state, value) {
    const i = state.datas.findIndex((x) => x.SK === value)
    $("#laundryInventoryModalEdit").modal("show");
    state.updateData = state.datas[i];
    state.changeOptions = state.datas[i].Name
  },
  resetUpdateData(state) {
    state.updateData = ''
    state.changeOptions = ''
  },
  setOptions(state, data) {
    state.changeOptions = data
  },
  updateData(state, value) {
    const i = state.datas.findIndex((x) => x.SK === value.SK)

    const data = state.datas[i]
    data.Name = value.Name
    data.Qty = value.Qty
    data.Amount = value.Amount

    $("#formInventoryModalEdit")[0].reset()
    $("#laundryInventoryModalEdit").modal("hide");

    state.updateData = ''
    state.changeOptions = ''
  },
  deleteItem(state, value) {
    const i = state.datas.findIndex((x) => x.SK === value);
    state.datas.splice(i, 1);
  },
}
