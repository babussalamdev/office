import Swal from "sweetalert2";
export default {
  globalLoad(state) {
    state.globalLoad = state.globalLoad ? false : true;
  },
  resetBeforeRender(state) {
    state.select = [];
    state.santri = [];
    state.openEdit = "";
    state.nilai = 0;
    state.th = { Nama: "", Total: "" };
    state.selectedQuran = "";
    state.selectHalaqah = [];
    state.selectedByHalaqah = "";
    state.selectKelas = [];
    state.selectedByKelas = "";
    state.selectedType = "halaqah";
  },
  setState(state, data) {
    if (data.key === "santri") {
      // Logic to convert "80/100" string format to Number 80
      const remappedData = data.value.map((item) => {
        const penilaian = item.Penilaian || {};
        const remappedPenilaian = Object.keys(penilaian).reduce((acc, key) => {
          // Safety check if value exists
          if (penilaian[key]) {
            const [value] = penilaian[key].toString().split("/");
            acc[key] = Number(value);
          } else {
            acc[key] = 0;
          }
          return acc;
        }, {});

        return {
          ...item,
          Penilaian: remappedPenilaian,
        };
      });
      state[data.key] = remappedData;
    } else if (data.key === "selectedLabel") {
      // When Year changes, update semester list
      state[data.key] = data.value;
      state.semester = state.label[data.value] || [];
      state.selectedSemester = "";
      state.listKelas = [];
      state.santri = [];
    } else {
      state[data.key] = data.value;
    }
  },

  setPeriode(state, data) {
    // Group semesters by Label (Year)
    const groupedData = data.resPeriode.reduce((acc, item) => {
      if (!acc[item.Label]) {
        acc[item.Label] = [];
      }
      acc[item.Label].push({
        Semester: item.Semester,
        Status: item.Status,
      });
      return acc;
    }, {});

    state.label = groupedData;
    // Set default selected label if provided in data
    // state.selectedLabel = data.label;

    // Update semester list based on current selected label
    if (state.selectedLabel && groupedData[state.selectedLabel]) {
      state.semester = groupedData[state.selectedLabel];
    }
  },

  resetForNewSemester(state) {
    state.listKelas = [];
    state.selectedKelas = "";
    state.santri = [];
    state.th = { Nama: "", Total: "" };
    state.selectedQuran = "";
  },
  setUnit(state, data) {
    state.select = data;
    state.santri = [];
  },
  setType(state, data) {
    if (data.type === "halaqah") {
      state.selectHalaqah = data.result;
      state.selectedByKelas = "";
    } else {
      state.selectKelas = data.result;
      state.selectedByHalaqah = "";
    }
    state.santri = [];
    state.th = { Nama: "", Total: "" };
  },
  setPenilaian(state, data) {
    if (data["type"] === "set" && !state.nilai) {
      state.santri[data.index].Penilaian[data.key] = isNaN(state.santri[data.index].Penilaian[data.key])
        ? "0"
        : state.santri[data.index].Penilaian[data.key].toString();
      state.nilai = state.santri[data.index].Penilaian[data.key];
      if (state.santri[data.index].Penilaian[data.key]) {
        state.openEdit = data;
      }
    } else if (data["type"] === "close") {
      state.santri[state.openEdit.index].Penilaian[state.openEdit.key] = +state.nilai;
      state.santri[state.openEdit.index].TotalScore = +data.result.Total;
      state.nilai = "";
      state.openEdit = "";
    } else if (data["type"] === "button") {
      state.santri[state.openEdit.index].Penilaian[state.openEdit.key] = +state.nilai;
      state.santri[state.openEdit.index].TotalScore = +data.result.Total;
      state.openEdit = "";
      state.nilai = "";
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
    state.btn = state.btn ? false : true;
  },
};
