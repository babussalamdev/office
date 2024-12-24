export default {
  setState(state, data) {
    if (data.key === 'kelas') {
      state[data.key] = data.value
      state.santri = []
      state.selectedMapel = ''
      state.selectedKelas = ''
      state.mapel = ''
      state.th = { Nama: '', Total: '' }
    } else if (data.key === 'selectedLabel') {
      state.semester = state.label[data.value]
      state.selectedSemester = ''
      state.santri = []
      state.selectedMapel = ''
      state.selectedKelas = ''
      state.mapel = ''
      state.th = { Nama: '', Total: '' }
      state[data.key] = data.value
    } else if (data.key === 'selectedSemester') {

      state[data.key] = data.value
    } else if (data.key === 'santri') {
      if (data.status === 'active') {
        const newData = state.selectedMapel?.Penilaian || {};
        // Menyiapkan objek header baru
        const newHeaders = { Nama: '' };
        // Tambahkan data baru dari selectedMapel.Penilaian
        for (const [key, value] of Object.entries(newData)) {
          newHeaders[key] = value;
        }
        // Tambahkan 'Total' jika ada sebelumnya
        if (state.th.hasOwnProperty('Total')) {
          newHeaders['Total'] = state.th['Total'];
        }
        // Update th dengan header baru
        state.th = newHeaders;
      } else {
        const penilaian = data.value[0].Penilaian
        const newData = penilaian || {};
        // Menyiapkan objek header baru
        const newHeaders = { Nama: '' };
        // Tambahkan data baru dari selectedMapel.Penilaian
        for (const [key, value] of Object.entries(newData)) {
          newHeaders[key] = value;
        }
        // Tambahkan 'Total' jika ada sebelumnya
        if (state.th.hasOwnProperty('Total')) {
          newHeaders['Total'] = state.th['Total'];
        }
        // Update th dengan header baru
        state.th = newHeaders;
      }
      console.log(data.status)
      state[data.key] = data.value
    } else {
      state[data.key] = data.value
    }
  },
  setMapel(state, data) {
    state.selectedMapel = ''
    state.santri = []
    state.mapel = data.mapel
    state.th = { Nama: '', Total: '' }
  },
  setMapelSemester(state, data) {
    state.selectedMapel = ''
    state.santri = []
    state.mapel = data.mapel
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
        Status: item.Status
      });
      return acc;
    }, {});

    // console.log(groupedData);
    state.periode = data.resPeriode
    state.label = groupedData
    state.selectedLabel = data.label
    if (groupedData[data.label]) {
      console.log(data.semester)
      const datas = groupedData[data.label]
      console.log(datas)
      state.selectedSemester = datas.find(item => item.Semester === data.semester);
      state.semester = groupedData[data.label]
      console.log(state.semester)
    }
    // console.log(!groupedData[data.label])
    // const uniqueLabels = [...new Set(data.resPeriode.map(item => item.Label))];
    // state.label = uniqueLabels
    // const uniqueSemesters = data.resPeriode.filter(item => item.Label === state.selectedLabel).map(item => item.Semester);
  },
  // setPeriode(state, data) {
  //   console.log(data)
  //   state.periode = data
  // }
  resetWithClass(state, data) {
    state.santri = []
    state.selectedMapel = ''
    state.selectedKelas = ''
    state.mapel = []
    state.th = { Nama: '', Total: '' }
  },
}
