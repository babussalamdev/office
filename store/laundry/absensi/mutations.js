export default {
  setPegawai(state, value) {
    if (value) {
      state.pegawai = value
    } else {
      state.select = value
      state.pegawai = []
      state.permissions = []
    }
  },
  setState(state, data) {
    state[data.key] = data.value
  },
  updateAbsen(state, value) {
    const i = state.pegawai.findIndex((x) => x.SK === value.SK)
    const data = state.pegawai[i]
    // Membuat salinan data dan memperbarui salinan tersebut
    const updatedPegawai = state.pegawai.map((item, index) => {
      if (index === i) {
        // Salinan data yang diperbarui
        const updatedItem = { ...item };

        // Memperbarui Logs dengan data baru
        updatedItem.laundry = {
          ...item.laundry,
          ...value.Logs.laundry
        };

        return updatedItem;
      }
      return item;
    });

    // Mengganti data santri lama dengan data yang telah diperbarui
    state.pegawai = updatedPegawai;
  },
  deleteAbsen(state, value) {
    const i = state.pegawai.findIndex((x) => x.SK === value.SK)
    const data = state.pegawai[i]
    // Membuat salinan data dan memperbarui salinan tersebut
    const updatedPegawai = state.pegawai.map((item, index) => {
      if (index === i) {
        // Salinan data yang diperbarui
        const updatedItem = { ...item };

        // Memperbarui Logs dengan data baru
        updatedItem.laundry = {
          ...item.laundry,
          ...value.Logs.laundry
        };

        return updatedItem;
      }
      return item;
    });

    // Mengganti data santri lama dengan data yang telah diperbarui
    state.pegawai = updatedPegawai;
  },
  setAbsensi(state, value) {
    const i = state.pegawai.findIndex((x) => x.SK === value.sk)
    const obj = {
      pegawai: state.pegawai[i],
      type: value.type,
      time: value.time
    }
    state.updateData = obj
    $("#modalAbsen").modal("show");
  },

  // detail
  setAbsensiDetail(state, data) {
    state.absensiDetail = data
  },

  // rekap
  setRekap(state, data) {
    state.dataRekap = data
  }
}
