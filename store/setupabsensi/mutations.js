export default {
  setAbsensi(state, value) {
    state.absensi = value.absensi
    state.struktur = value.struktur
  },
  inputStruktur(state, value) {
    state.absensi.push(value);
    state.absensi.sort((a, b) => {
      return a.Sort - b.Sort;
    });

    state.value = [];
    $("#inputDataStruktur").modal("hide");
    $("#inputStruktur")[0].reset();
  },
  deleteStruktur(state, value) {
    const sk = value.replace('%23', '#')
    const i = state.absensi.findIndex((x) => x.SK === sk);
    state.absensi.splice(i, 1);
  },
  editItem(state, value) {
    const i = state.absensi.findIndex((x) => x.SK === value)
    state.updateData = state.absensi[i];
    $("#updateDataStruktur").modal("show");
  },
  updateStruktur(state, value) {
    const sk = value.SK.replace('%23', '#')
    const i = state.absensi.findIndex((x) => x.SK === sk)
    console.log(value)
    const data = state.absensi[i];
    data.Struktur = value.Struktur
    data.Permissions = value.Permissions

    state.value = [];
    state.updateData = ''
    $("#updateStruktur")[0].reset();
    $("#updateDataStruktur").modal("hide");
  },

  // partikel
  btn(state, value) {
    state.btn = state.btn ? false : true
  },
  setValue(state, value) {
    state.value = value
  }
}
