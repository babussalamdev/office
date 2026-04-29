export default {
  setState(state, data) {
    if (data.key === "kelas") {
      state[data.key] = data.value;
      state.santri = [];
      state.selectedMapel = "";
      state.selectedKelas = ""; // Important to reset selected class when list changes
      state.mapel = "";
      state.th = { Nama: "", Total: "" };
    } else if (data.key === "selectedLabel") {
      state.semester = state.label[data.value];
      state.selectedSemester = "";
      state.santri = [];
      state.selectedMapel = "";
      state.selectedKelas = "";
      state.mapel = "";
      state.th = { Nama: "", Total: "" };
      state[data.key] = data.value;
    } else if (data.key === "selectedSemester") {
      state[data.key] = data.value;
    } else {
      state[data.key] = data.value;
    }
  },
  setMapel(state, data) {
    state.selectedMapel = "";
    state.santri = [];
    state.mapel = data.mapel || []; // Handle undefined
    state.th = { Nama: "", Total: "" };
  },
  setMapelSemester(state, data) {
    state.selectedMapel = "";
    state.santri = [];
    state.mapel = data.mapel;
  },
  setPeriode(state, data) {
    console.log(data);
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
    state.kelas = []; // Clear class list (will be refetched if inactive)
    state.selectedKelas = "";
    state.mapel = [];
    state.selectedMapel = "";
    state.santri = [];
    state.th = { Nama: "", Total: "" };
  },

  resetWithClass(state) {
    state.santri = [];
    state.selectedMapel = "";
    state.selectedKelas = "";
    state.mapel = [];
    state.th = { Nama: "", Total: "" };
  },
};
