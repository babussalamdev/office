export default {
  setPelanggaran(state, value) {
    // state.pelanggaran = value
    state.pelanggaran = value.pelanggaran
    state.struktur = value.struktur
  },
  inputStruktur(state, value) {
    state.pelanggaran.push(value);
    state.pelanggaran.sort((a, b) => {
      return a.Sort - b.Sort;
    });

    state.value = [];
    $("#inputPelanggaran")[0].reset()
    $("#inputDataPelanggaran").modal("hide");

  },
  deleteStruktur(state, value) {
    const i = state.pelanggaran.findIndex((x) => x.SK === value);
    state.pelanggaran.splice(i, 1);
  },
  editItem(state, value) {
    const index = state.pelanggaran.findIndex((x) => x.SK === value)
    $("#updateDataPelanggaran").modal("show");
    state.updateData = state.pelanggaran[index];
  },


  setValue(state, value) {
    state.value = value
  },
  btn(state) {
    state.btn = state.btn ? false : true
  },
}
