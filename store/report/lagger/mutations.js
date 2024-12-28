export default {
  setState(state, data) {
    if (data.key === 'kelas') {
      state[data.key] = data.value
      state.santri = ''
      state.mapelSelect = []
      state.quranSelect = []
      state.selectedQuran = ''
      state.selectedMapel = ''
      state.selectedKelas = ''
    } else if (data.key === 'selectedLabel') {
      state[data.key] = data.value
      state.semester = state.label[data.value]
      state.selectedSemester = ''
      state.santri = []
      if (state.kelas.length > 0) {
        state.mapelSelect = []
        state.quranSelect = []
        state.selectedQuran = ''
        state.selectedMapel = ''
        state.selectedKelas = ''
      } else {
        state.selectedQuran = ''
        state.selectedMapel = ''
      }
    } else {
      state[data.key] = data.value
    }
  },
  resetUnWalas(state) {
    state.santri = ''
    state.mapelSelect = []
    state.quranSelect = []
    state.selectedQuran = ''
    state.selectedMapel = ''
    state.selectedKelas = ''
  },

  // periode
  setPeriode(state, data) {
    console.log(data)
    // Menggunakan reduce untuk mengelompokkan data berdasarkan Label
    const groupedData = data.resPeriode.reduce((acc, item) => {
      // Jika key untuk Label belum ada, buat array untuk menyimpan objek
      if (!acc[item.Label]) {
        acc[item.Label] = [];
      }
      // Push objek baru berisi Semester dan Status
      acc[item.Label].push({
        Semester: item.Semester,
        Status: item.Status
      });
      return acc;
    }, {});

    // console.log(groupedData);
    state.periode = data.resPeriode
    state.label = groupedData
    state.selectedLabel = data.tahun
    if (groupedData[data.tahun]) {
      const datas = groupedData[data.tahun]
      state.selectedSemester = datas.find(item => item.Semester === data.semester);
      state.semester = groupedData[data.tahun]
    }

    console.log(state.periode)
    console.log(state.label)
    console.log(state.selectedLabel)
    console.log(state.selectedSemester)
    console.log(state.semester)
  },
}
