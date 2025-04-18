import state from "./state"

export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  setSelectKelas(state, value) {
    state.select = value
    state.santri = []
  },
  setSantri(state, value) {
    state.santri = value.resSantri
    state.selectEkskull = value.resSelect
  },
  editBulk() {
    $("#updateDataSantriEkskull").modal("show");
  },
  btn(state) {
    state.btn = !state.btn
  },
  updateEkskullSantri(state, data) {
    const updatedData = state.santri.map(item => {
      // Cari objek dalam state.santri yang memiliki SK yang sama dengan yang ada di data.sort
      if (data.sort.includes(item.SK)) {
        // Salin objek agar tidak memodifikasi state langsung
        const updatedItem = { ...item };
        // Perbarui nilai 'Kelas' dari objek yang ditemukan
        updatedItem['Ekskull'] = data.value;
        return updatedItem;
      }
      return item; // Kembalikan objek tanpa modifikasi jika tidak ada yang sesuai
    });

    // Perbarui state dengan data yang diperbarui
    state.santri = updatedData;

    state.ekskullShow = "";
    state.data = [];
    $("#updateDataSantriEkskull").modal("hide");

  },
}
