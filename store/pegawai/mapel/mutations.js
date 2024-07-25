export default {
  setState(state, value) {
    state[value.key] = value.value
    console.log(state[value.key])
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
    data['GSIPK1'] = value.GSIPK1

    const updatedData = state.mapel.map((item, index) => {
      if (index === i) {
        return data;
      }
      return item;
    });

    state.mapel = updatedData
  },
  editItem(state, data) {
    const index = state.mapel.findIndex((x) => x.SK === data)
    $("#mapelSetupModal").modal("show");
    state.updateData = state.mapel[index];
  },


  // partikel
  btn(state) {
    state.btn = state.btn ? false : true
  }
}
