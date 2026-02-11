export default {
  setState(state, data) {
    if (data.key === "kelas") {
      state[data.key] = data.value;
      // If we are setting the class list, we should reset the selected class and data
      state.santri = [];
      state.mapelSelect = [];
      state.quranSelect = [];
      state.selectedQuran = "";
      state.selectedMapel = "";
      state.selectedKelas = "";
    } else if (data.key === "selectedLabel") {
      state[data.key] = data.value;
      state.semester = state.label[data.value];
      state.selectedSemester = "";
      state.santri = [];
      state.kelas = []; // Reset class list when year changes
      state.selectedKelas = "";
    } else {
      state[data.key] = data.value;
    }
  },

  // NEW: Call this at start of changeUnitSemester
  resetForNewSemester(state) {
    state.santri = [];
    state.kelas = [];
    state.selectedKelas = "";
    state.mapelSelect = [];
    state.quranSelect = [];
    state.selectedQuran = "";
    state.selectedMapel = "";
  },

  resetUnWalas(state) {
    state.santri = [];
    state.mapelSelect = [];
    state.quranSelect = [];
    state.selectedQuran = "";
    state.selectedMapel = "";
    state.selectedKelas = "";
  },

  // periode
  setPeriode(state, data) {
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

    state.periode = data.resPeriode;
    state.label = groupedData;
    state.selectedLabel = data.tahun;
    if (groupedData[data.tahun]) {
      const datas = groupedData[data.tahun];
      state.selectedSemester = datas.find((item) => item.Semester === data.semester);
      state.semester = groupedData[data.tahun];
    }
  },
};
