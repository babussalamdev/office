export default {
  setState(state, data) {
    if (data.key === "asrama") {
      state[data.key] = data.value;
      state.values = [];
      state.selectedAsrama = ""; // Important to reset selected class when list changes
    } else if (data.key === "selectedLabel") {
      state.semester = state.label[data.value];
      state.selectedSemester = "";
      state.values = [];
      state.selectedAsrama = "";
      state[data.key] = data.value;
    } else if (data.key === "selectedSemester") {
      state[data.key] = data.value;
      state.values = [];
    } else if (data.key === "selectedAsrama") {
      state[data.key] = data.value;
      state.values = [];
    } else {
      state[data.key] = data.value;
    }
  },
  setMapelSemester(state, data) {
    state.selectedAsrama = "";
    state.santri = [];
    state.asrama = data.asrama;
  },
  setPeriode(state, data) {
    // Menggunakan reduce untuk mengelompokkan data berdasarkan Label
    const groupedData = data.resPeriode.reduce((acc, item) => {
      // Jika key untuk Label belum ada, buat array untuk menyimpan objek
      if (!acc[item.Label]) {
        acc[item.Label] = [];
      }
      // Push objek baru berisi Semester dan Status
      acc[item.Label].push({
        Semester: item.Semester,
        Status: item.Status,
      });
      return acc;
    }, {});

    // console.log(groupedData);
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
    state.asrama = []; // Clear class list (will be refetched if inactive)
    state.selectedAsrama = "";
    state.values = [];
    state.th = { Nama: "", Total: "" };
  },

  resetWithClass(state) {
    state.santri = [];
    state.selectedAsrama = "";
    state.th = { Nama: "", Total: "" };
  },
};
