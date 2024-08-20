export default {
  setState(state, value) {
    state[value.key] = value.value
  },
  setMain(state, value) {
    state.kelas = value.kelas
    state.jurusan = value.jurusan
    state.mapel = ''
  },
  setKelas(state, value) {
    state.mapel = value.mapel
    state.pengajar = value.pengajar
  },
  setPengajar(state, value) {
    const i = state.mapel.findIndex((x) => x.SK === value.SK)
    const data = state.mapel[i];
    data['GSIPK1'] = value.Pengajar
    $("#updateMapel")[0].reset();
    $("#mapelSetupModal").modal("hide");

  },
  editItem(state, data) {
    const index = state.mapel.findIndex((x) => x.SK === data)
    $("#mapelSetupModal").modal("show");
    state.updateData = state.mapel[index];
    const i = state.pengajar.findIndex((x) => x.SK === state.updateData.skpengajar)
    state.pengajarShow = state.pengajar[i]
  },


  // partikel
  btn(state) {
    state.btn = state.btn ? false : true
  }
}
