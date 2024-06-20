export default {
  setMapel(state, value) {
    state.kelas = value.kelas
    state.jurusan = value.jurusan
    state.mapel = []
    state.setKelas = ''
  },
  setKelas(state, value) {
    state.mapel = value.mapel
  },
  setSelectKelas(state, value) {
    state.selectKelas = value
  },
  inputMapel(state, value) {
    state.mapel.push(value);
    state.mapel.sort((a, b) => {
      return a.Sort - b.Sort;
    });

    state.value = [];
    $("#InputDataMapel").modal("hide");
    $("#inputMapel")[0].reset()
  },
  editItem(state, value) {
    const i = state.mapel.findIndex((x) => x.SK === value)

    $("#updateDataMapel").modal("show");
    state.updateData = state.mapel[i];
  },
  updateMapel(state, value) {
    const sk = value.SK.replace(/%23/g, "#")
    const i = state.mapel.findIndex((x) => x.SK === sk)

    const data = state.mapel[i]
    data.Sort = value.Sort;
    data.Nama = value.Nama;
    data.Kelas = value.Kelas;
    data.Jurusan = value.Jurusan;
    data.Hari = value.Hari

    state.value = [];
    $("#updateMapel")[0].reset();
    $("#updateDataMapel").modal("hide");
  },
  deleteMapel(state, value) {
    const i = state.mapel.findIndex((x) => x.SK === value);
    state.mapel.splice(i, 1);
  },

  // partikel
  btn(state) {
    state.btn = state.btn ? false : true
  },
  setValue(state, value) {
    state.value = value
  }
}
