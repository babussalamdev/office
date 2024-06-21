export default {
  setSelectKelas(state, value) {
    state.santri = []
    state.select = value
    state.kelas = ''
  },
  setSantri(state, value) {
    state.santri = value.Santri
    state.selectAsrama = value.Select
  },
  setKelas(state, value) {
    state.kelas = value
  },
  editBulk(state, value) {
    $("#updateDataSantriAsrama").modal("show");
    state.updateData = value;
  },
  setAsramaShow(state, value) {
    console.log('done')
    state.asramaShow = value
  },
  updateAsramaSantri(state, data) {
    const updatedData = state.santri.map(item => {
      // Cari objek dalam state.santri yang memiliki SK yang sama dengan yang ada di data.sort
      if (data.sort.includes(item.SK)) {
        // Salin objek agar tidak memodifikasi state langsung
        const updatedItem = { ...item };
        // Perbarui nilai 'Kelas' dari objek yang ditemukan
        updatedItem['Asrama'] = data.value;
        return updatedItem;
      }
      return item; // Kembalikan objek tanpa modifikasi jika tidak ada yang sesuai
    });

    // Perbarui state dengan data yang diperbarui
    state.santri = updatedData;

    state.asramaShow = "";
    $("#updateDataSantriAsrama").modal("hide");
  },

  btn(state) {
    state.btn = state.btn ? false : true
  }
}
