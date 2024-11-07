
export default {
  setkaldik(state, value) {
    state.kaldik = value
  },
  inputKaldik(state, value) {
    state.kaldik.push(value);
    state.kaldik.sort((a, b) => {
      return a.Sort - b.Sort;
    });

    $("#inputDataKaldik")[0].reset()
    $("#inputKaldik").modal("hide");
  },
  editItem(state, value) {
    const i = state.kaldik.findIndex((x) => x.SK === value)
    $("#updateKaldik").modal("show");
    state.updateData = state.kaldik[i];
  },
  updateKaldik(state, value) {
    const sk = value.SK.replace('%23', '#')
    const i = state.kaldik.findIndex((x) => x.SK === sk)

    const data = state.kaldik[i]
    data.Nama = value.Nama
    data.TanggalMulai = value.TanggalMulai
    data.TanggalAkhir = value.TanggalAkhir
    data.WarnaLabel = value.WarnaLabel

    $("#updateDataKaldik")[0].reset()
    $("#updateKaldik").modal("hide");

  },
  deleteKaldik(state, value) {
    const i = state.kaldik.findIndex((x) => x.SK === value);
    state.kaldik.splice(i, 1);
  },

  // partikel
  btn(state) {
    state.btn = state.btn ? false : true
  },
  setStart(state, value) {
    state.start = value
  },
  setEnd(state, value) {
    state.end = value
  }
}
