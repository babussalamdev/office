export default {
  setSelectedMapel(state, value) {
    state.selectedMapel = value
  },
  setSantri(state, value) {
    state.santri = value
  },
  setSelect(state, value) {
    state.select = value
  },
  setDataSantri(state, value) {
    state.santri = value
  },
  // setSantriTahfidz(state, value) {
  //   // if (value) {
  //   //   state.santri = value
  //   //   // state.permissions = value.resPermissions.split(',')
  //   //   // if (value.select) {
  //   //   //     state.select = value.select
  //   //   // }
  //   // } else {
  //   //   state.select = value
  //   //   state.santri = []
  //   //   state.permissions = []
  //   // }

  // },
  updateAbsen(state, value) {
    const i = state.santri.findIndex((x) => x.SK === value.SK)
    const data = state.santri[i]
    // Membuat salinan data dan memperbarui salinan tersebut
    const updatedSantri = state.santri.map((item, index) => {
      if (index === i) {
        // Salinan data yang diperbarui
        const updatedItem = { ...item };

        // Memperbarui Logs dengan data baru
        updatedItem.Logs = {
          ...item.Logs,
          ...value.Logs
        };

        return updatedItem;
      }
      return item;
    });

    // Mengganti data santri lama dengan data yang telah diperbarui
    state.santri = updatedSantri;
  },
  deleteAbsen(state, value) {
    const i = state.santri.findIndex((x) => x.SK === value.SK)
    const data = state.santri[i]
    // Membuat salinan data dan memperbarui salinan tersebut
    const updatedSantri = state.santri.map((item, index) => {
      if (index === i) {
        // Salinan data yang diperbarui
        const updatedItem = { ...item };

        // Memperbarui Logs dengan data baru
        updatedItem.Logs = {
          ...item.Logs,
          ...value.Logs
        };

        return updatedItem;
      }
      return item;
    });

    // Mengganti data santri lama dengan data yang telah diperbarui
    state.santri = updatedSantri;
  },
  // setStatus(state, value) {
  //   state[value.name] = value.value
  // },
  setAbsensi(state, value) {
    console.log(value)
    const i = state.santri.findIndex((x) => x.SK === value.sk)
    const obj = {
      santri: state.santri[i],
      type: value.type,
      time: value.time
    }
    state.updateData = obj
    $("#modalAbsen").modal("show");
  },
}
