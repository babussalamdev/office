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
      const remappedData = data.value.map((item) => {
        const penilaian = item.Penilaian || {};
        const remappedPenilaian = Object.keys(penilaian).reduce((acc, key) => {
          const rawVal = penilaian[key];
          if (rawVal === null || rawVal === undefined) {
            acc[key] = 0;
          } else {
            const valString = String(rawVal).split("/")[0];
            acc[key] = Number(valString) || 0;
          }
          return acc;
        }, {});
        return { ...item, Penilaian: remappedPenilaian };
      });
      state[data.key] = remappedData;
    } else if (data.key === "selectedLabel") {
      state[data.key] = data.value;
      state.semester = state.label[data.value] || [];
      state.selectedSemester = "";
      state.listKelas = [];
      state.santri = [];
    } else if (data.key === "selectHalaqah") {
      state.santri = [];
      state.th = { Nama: "", Total: "" };
      state.selectedByKelas = "";
      state[data.key] = data.value;
    } else {
      state[data.key] = data.value;
    }
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
  btn(state) {
    state.btn = state.btn ? false : true;
  },

  // Report Specific Mutations
  setPeriode(state, data) {
    const groupedData = data.resPeriode.reduce((acc, item) => {
      if (!acc[item.Label]) acc[item.Label] = [];
      acc[item.Label].push({ Semester: item.Semester, Status: item.Status });
      return acc;
    }, {});
    state.label = groupedData;
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
};
