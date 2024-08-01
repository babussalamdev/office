export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  setUnit(state, data) {
    state.select = data
  },
  // openEdit(state, data) {
  //   // nutup input lain
  //   if(state.openEdit) {
  //     state.santri[state.openEdit.index].Penilaian[state.openEdit.key] = +state.nilai
  //   }
  //   if(data['type'] === 'tutup') {
  //     console.log(data.type)
  //     // state.santri[state.openEdit.index].Penilaian[state.openEdit.key] = +state.nilai
  //   } else if (data['type' === 'set']) {
  //     console.log(data.type)
  //   }

  //   state.santri[data.index].Penilaian[data.key] = state.santri[data.index].Penilaian[data.key].toString()
  //   // console.log(state.santri[data.index].Penilaian[data.key])
  //   state.nilai = state.santri[data.index].Penilaian[data.key]
  //   if(state.santri[data.index].Penilaian[data.key]) {
  //     state.openEdit = data
  //   }
  //   // console.log(state.santri[data.index].Penilaian[data.key])
  // },
  setPenilaian(state, data) {
    if (data['type'] === 'set') {
      state.santri[data.index].Penilaian[data.key] = state.santri[data.index].Penilaian[data.key].toString()
      state.nilai = state.santri[data.index].Penilaian[data.key]
      if (state.santri[data.index].Penilaian[data.key]) {
        state.openEdit = data
      }
    } else if (data['type'] === 'close') {
      state.santri[state.openEdit.index].Penilaian[state.openEdit.key] = +state.nilai
      state.nilai = 0
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
