export default {
  btn(state) {
    state.btn = !state.btn
  },
  setState(state, data) {
    state[data.key] = data.value
  },
  setKelas(state, data) {
    state.kelas = data.kelas
    state.quran = data.quran

    const separatedPenilaian = data.quran.map(item => {
      if (item.Penilaian) {
        // Mengambil nilai dari Penilaian dan mengubahnya menjadi array berisi string-format nama-bobot
        const penilaianArray = Object.entries(item.Penilaian).map(([nama, bobot]) => `${nama}-${bobot}`);
        return penilaianArray;
      } else {
        // Jika Penilaian tidak ada, kembalikan array kosong atau null sesuai kebutuhan
        return []; // atau return null; atau lakukan tindakan lainnya
      }
    });
    state.penilaian = separatedPenilaian
  },
  inputQuran(state, value) {
    const i = state.quran.findIndex((x) => x.SK === value.SK)
    if (!state.penilaian[i]) {
      state.penilaian.push([])
    }
    state.quran.push(value);
    state.quran.sort((a, b) => {
      return a.Sort - b.Sort;
    });

    $("#inputnilaiquran").modal("hide");
    $("#inputQuran")[0].reset()
  },
  deleteQuran(state, value) {
    const i = state.quran.findIndex((x) => x.SK === value);
    state.quran.splice(i, 1);
    state.penilaian.splice(i, 1)
  },

  // penilaian
  inputScore(state, value) {
    const i = state.quran.findIndex((x) => x.SK === value)

    $("#inputDataQuranPenilaian").modal("show");
    state.updateDataPenilaian = state.quran[i];
  },
  updatePenilaian(state, value) {
    state['penilaian'][value.i].push(value.dataPenilaian.trim())
  },
  updateScore(state, value) {
    $("#inputDataQuranPenilaian").modal("hide")
    $("#inputQuranPenilaian")[0].reset()
  },
  deletePenilaian(state, value) {
    state['penilaian'][value.indexMapel].splice(value.indexPenilaian, 1)
  },
}
