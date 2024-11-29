
import Swal from "sweetalert2"
export default {
  globalLoad(state) {
    state.globalLoad = state.globalLoad ? false : true
  },
  setState(state, data) {
    if (data.key === 'santri') {
      const remappedData = data.value.map(item => {
        // Ambil objek Penilaian dari item
        const penilaian = item.Penilaian;

        // Map setiap key dalam objek Penilaian untuk melakukan split dan konversi
        const remappedPenilaian = Object.keys(penilaian).reduce((acc, key) => {
          const [value] = penilaian[key].split('/');
          acc[key] = Number(value);
          return acc;
        }, {});

        // Kembalikan objek dengan Penilaian yang sudah dimodifikasi
        return {
          ...item,
          Penilaian: remappedPenilaian
        };
      });
      state[data.key] = remappedData
    } else if (data.key === 'selectedMapel') {
      state[data.key] = data.value
    } else {
      state[data.key] = data.value
    }
  },
  setUnit(state, data) {
    state.select = data
    state.santri = []
  },
  setPenilaian(state, data) {
    if (data['type'] === 'set' && !state.nilai) {
      state.santri[data.index].Penilaian[data.key] = isNaN(state.santri[data.index].Penilaian[data.key]) ? "0" : state.santri[data.index].Penilaian[data.key].toString()
      state.nilai = state.santri[data.index].Penilaian[data.key]
      if (state.santri[data.index].Penilaian[data.key]) {
        state.openEdit = data
      }
    } else if (data['type'] === 'close') {
      state.santri[state.openEdit.index].Penilaian[state.openEdit.key] = +state.nilai
      state.santri[state.openEdit.index].TotalScore = +data.result.Total
      state.nilai = ''
      state.openEdit = ''
    } else if (data['type'] === 'button') {
      state.santri[state.openEdit.index].Penilaian[state.openEdit.key] = +state.nilai
      state.santri[state.openEdit.index].TotalScore = +data.result.Total
      state.openEdit = ''
      state.nilai = ''
    }
  },
  // setData(state, value) {
  //   state.kelas = value.kelas
  //   state.jurusan = value.jurusan
  //   state.ekskull = value.ekskull
  // },
  // updateKelas(state, value) {
  //   state.kelas.push(value);
  //   state.kelas.sort((a, b) => {
  //     return a.Sort - b.Sort;
  //   });

  //   $("#inputDataKelas")[0].reset();
  //   $("#inputKelas").modal("hide");
  // },
  // deleteKelas(state, value) {
  //   const i = state.kelas.findIndex((x) => x.SK === value);
  //   state.kelas.splice(i, 1);
  // },
  // updateJurusan(state, value) {
  //   state.jurusan.push(value);
  //   state.jurusan.sort((a, b) => {
  //     return a.Sort - b.Sort;
  //   });

  //   $("#inputDataJurusan")[0].reset();
  //   $("#inputJurusan").modal("hide");
  // },
  // deleteJurusan(state, value) {
  //   const i = state.jurusan.findIndex((x) => x.SK === value);
  //   state.jurusan.splice(i, 1);
  // },
  // updateEkskull(state, value) {
  //   state.ekskull.push(value);
  //   state.ekskull.sort((a, b) => {
  //     return a.Sort - b.Sort;
  //   });

  //   $("#inputDataEkskull")[0].reset();
  //   $("#inputEkskull").modal("hide");
  // },
  // deleteEkskull(state, value) {
  //   const i = state.ekskull.findIndex((x) => x.SK === value);
  //   state.ekskull.splice(i, 1);
  // },

  // // penilaian kelas
  // setkelasPenilaian(state, value) {
  //   state.selectKelas = value
  // },
  // selectMapel(state, value) {
  //   state.selectedMapel = value
  // },
  // setPeriode(state, value) {
  //   state.selectedPeriode = value
  // },
  // setNilai(state, value) {
  //   state.nilaiSantri = value.santri
  // },

  // partikel settings kelas
  btn(state) {
    state.btn = state.btn ? false : true
  }
}
