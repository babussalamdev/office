export default {
  setState(state, data) {
    if (data.key === "kelas") {
      state[data.key] = data.value;
      state.santri = [];
      state.selectedMatan = "";
      state.selectedKelas = "";
      state.matan = [];
      state.th = { Nama: "", Total: "" };
    } else if (data.key === "selectedLabel") {
      state.semester = state.label[data.value];
      state.selectedSemester = "";
      state.santri = [];
      state.selectedMatan = "";
      state.selectedKelas = "";
      state.matan = [];
      state.th = { Nama: "", Total: "" };
      state[data.key] = data.value;
    } else if (data.key === "selectedSemester") {
      state[data.key] = data.value;
    } else {
      state[data.key] = data.value;
    }
  },
  setMatan(state, data) {
    state.selectedMatan = "";
    state.santri = [];
    // Accommodates whether API returns array directly or inside an object
    state.matan = Array.isArray(data) ? data : data.matan || data.mapel || [];
    state.th = { Nama: "", Total: "" };
  },
  setMatanSemester(state, data) {
    state.selectedMatan = "";
    state.santri = [];
    state.matan = Array.isArray(data) ? data : data.matan || data.mapel || [];
  },
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
    state.selectedLabel = data.label;
    if (groupedData[data.label]) {
      const datas = groupedData[data.label];
      state.selectedSemester = datas.find((item) => item.Semester === data.semester);
      state.semester = groupedData[data.label];
    }
  },
  resetForNewSemester(state) {
    state.kelas = [];
    state.selectedKelas = "";
    state.matan = [];
    state.selectedMatan = "";
    state.santri = [];
    state.th = { Nama: "", Total: "" };
  },
  resetWithClass(state) {
    state.santri = [];
    state.selectedMatan = "";
    state.selectedKelas = "";
    state.matan = [];
    state.th = { Nama: "", Total: "" };
  },
};
