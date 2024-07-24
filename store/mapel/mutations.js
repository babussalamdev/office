export default {
  setMapel(state, value) {
    state.kelas = value.kelas
    state.jurusan = value.jurusan
    state.mapel = []
    state.setKelas = ''
  },
  setKelas(state, value) {
    state.mapel = value.mapel
    // Memisahkan nilai dari Penilaian ke dalam array array baru
    const separatedPenilaian = value.mapel.map(item => {
      if (item.Penilaian) {
        // Mengambil nilai dari Penilaian dan mengubahnya menjadi array berisi string-format nama-bobot
        const penilaianArray = Object.entries(item.Penilaian).map(([nama, bobot]) => `${nama}-${bobot}`);
        return penilaianArray;
      } else {
        // Jika Penilaian tidak ada, kembalikan array kosong atau null sesuai kebutuhan
        return []; // atau return null; atau lakukan tindakan lainnya
      }
    });
    state.Penilaian = separatedPenilaian
  },
  setSelectKelas(state, value) {
    state.selectKelas = value
  },
  inputMapel(state, value) {
    const i = state.mapel.findIndex((x) => x.SK === value.SK)
    if (!state.Penilaian[i]) {
      state.Penilaian.push([])
    }
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
    state.Penilaian.splice(i, 1)
  },

  // partikel
  btn(state) {
    state.btn = state.btn ? false : true
  },
  setValue(state, value) {
    state.value = value
  },

  // penilaian
  inputScore(state, value) {
    const i = state.mapel.findIndex((x) => x.SK === value)

    $("#inputDataMapelPenilaian").modal("show");
    state.updateDataPenilaian = state.mapel[i];
  },
  updatePenilaian(state, value) {
    state['Penilaian'][value.i].push(value.dataPenilaian.trim())
  },
  deletePenilaian(state, value) {
    state['Penilaian'][value.indexMapel].splice(value.indexPenilaian, 1)
  },
  updateScore(state, value) {
    $("#inputDataMapelPenilaian").modal("hide")
    $("#inputMapelPenilaian")[0].reset()
  },
  // deleteScore(state, value) {
  //   const i = state.mapel.findIndex((x) => x.SK === value.sk)
  //   const { Penilaian, ...rest } = value.data;
  //   if (Penilaian && Object.keys(Penilaian).length > 0) {
  //     const penilaianArray = Object.entries(Penilaian).map(([nama, bobot]) => ({
  //       nama,
  //       bobot
  //     }));
  //     state.mapel[i].Penilaian = penilaianArray
  //   }
  // }
}
