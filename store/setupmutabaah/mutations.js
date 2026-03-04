export default {
  setState(state, data) {
    state[data.key] = data.value;
  },
  btn(state) {
    state.btn = state.btn ? false : true;
  },
  updateMutabaah(state, value) {
    const i = state.list.findIndex((x) => x.SK === value);
    $("#updateDataMutabaahPenilaian").modal("show");
    state.updateDataPencatatan = state.list[i];
  },
  updatePencatatan(state, { i, pencatatan }) {
    // 1. Create a completely new item by spreading the old one
    // and attaching the brand new pencatatan object you created in the action.
    const updatedItem = {
      ...state.list[i],
      Pencatatan: pencatatan,
    };

    // 2. Use splice to replace the item reactively so the UI updates immediately
    state.list.splice(i, 1, updatedItem);
  },
  updatePencatatanModal(state, value) {
    $("#updateDataMutabaahPenilaian").modal("hide");
    $("#updatePencatatan")[0].reset();
  },
};
