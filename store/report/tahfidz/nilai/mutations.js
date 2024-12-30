export default {
  setState(state, data) {
    if (data.key === 'listKelas') {
      console.log(data)
      state.selectedKelas = ''
      state.santri = []
      state[data.key] = data.value
    } else if (data.key === 'selectedLabel') {
      state[data.key] = data.value
      state.semester = state.label[data.value]
      state.selectedSemester = ''
      state.selectedKelas = ''
      state.santri = []
      state.th = { Nama: '', Halaqah: '', Total: '' }
      state.listKelas = []
    } else if (data.key === 'selectedSemester') {
      state.th = { Nama: '', Halaqah: '', Total: '' }
      state[data.key] = data.value
    } else if (data.key === 'santri') {
      if (data.status === 'active') {
        const newData = state.selectedKelas?.Penilaian || {};
        // Menyiapkan objek header baru
        const newHeaders = { Nama: '', Halaqah: '' };
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
        const newHeaders = { Nama: '', Halaqah: '' };
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
      state[data.key] = data.value
    } else {
      state[data.key] = data.value
    }
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

    state.periode = data.resPeriode
    state.label = groupedData
    state.selectedLabel = data.tahun
    if (groupedData[data.tahun]) {
      const datas = groupedData[data.tahun]
      state.selectedSemester = datas.find(item => item.Semester === data.semester);
      state.semester = groupedData[data.tahun]
    }
  },
}
