export default {
  setData(state, value) {
    state.kelas = value.kelas
    state.jurusan = value.jurusan
    state.ekskull = value.ekskull
  },
  updateKelas(state, value) {
    state.kelas.push(value);
    state.kelas.sort((a, b) => {
      return a.Sort - b.Sort;
    });

    $("#inputDataKelas")[0].reset();
    $("#inputKelas").modal("hide");
  },
  deleteKelas(state, value) {
    const i = state.kelas.findIndex((x) => x.SK === value);
    state.kelas.splice(i, 1);
  },
  updateJurusan(state, value) {
    state.jurusan.push(value);
    state.jurusan.sort((a, b) => {
      return a.Sort - b.Sort;
    });

    $("#inputDataJurusan")[0].reset();
    $("#inputJurusan").modal("hide");
  },
  deleteJurusan(state, value) {
    const i = state.jurusan.findIndex((x) => x.SK === value);
    state.jurusan.splice(i, 1);
  },
  updateEkskull(state, value) {
    state.ekskull.push(value);
    state.ekskull.sort((a, b) => {
      return a.Sort - b.Sort;
    });

    $("#inputDataEkskull")[0].reset();
    $("#inputEkskull").modal("hide");
  },
  deleteEkskull(state, value) {
    const i = state.ekskull.findIndex((x) => x.SK === value);
    state.ekskull.splice(i, 1);
  },

  // penilaian kelas
  setkelasPenilaian(state, value) {
    state.selectKelas = value
  },
  selectMapel(state, value) {
    state.selectedMapel = value
  },
  setPeriode(state, value) {
    state.selectedPeriode = value
  },
  setNilai(state, value) {
    state.nilaiSantri = value.santri
  },

  // partikel settings kelas
  btn(state) {
    state.btn = state.btn ? false : true
  }
}
