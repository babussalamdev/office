export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  setSantriTahfidz(state, value) {
    if (value) {
      state.santri = value
      // state.permissions = value.resPermissions.split(',')
      // if (value.select) {
      //     state.select = value.select
      // }
    } else {
      state.select = value
      state.santri = []
      state.permissions = []
    }

  },
  setAbsen(state, data) {
    const activeSKs = data.filter(item => item.Status === 'active').map(item => item.SK);
    state.list = activeSKs
  },
  updateAbsen(state, value) {
    const i = state.santri.findIndex((x) => x.SK === value.SK)
    const data = state.santri[i]
    // Membuat salinan data dan memperbarui salinan tersebut
    const updatedSantri = state.santri.map((item, index) => {
      if (index === i) {
        // Salinan data yang diperbarui
        const updatedItem = { ...item };

        // Pastikan Logs dan halaqah ada
        updatedItem.Logs = updatedItem.Logs || {};
        updatedItem.Logs['halaqah'] = updatedItem.Logs['halaqah'] || {};

        // Memperbarui Logs dengan data baru
        updatedItem.Logs['halaqah'][value.time] = {
          ...item.Logs['halaqah'][value.time],
          ...value.Logs.halaqah[value.time]
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
        updatedItem.Logs.halaqah[value.time] = {
          ...item.Logs.halaqah[value.time],
          ...value.Logs.halaqah[value.time]
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
    const i = state.santri.findIndex((x) => x.SK === value.sk)
    const obj = {
      santri: state.santri[i],
      type: value.type,
      time: value.time
    }
    state.updateData = obj
    $("#modalAbsen").modal("show");
  },

  // catatan
  btncatatan(state) {
    state.btn = !state.btn
  },

  openModal(state, data) {
    $(`#${data.modal}`).modal('show')
    const i = state.santri.findIndex((x) => x.SK === data.sk)
    state.updateDataCatatan = state.santri[i]
  },
  setcatatanpagi(state, data) {
    const sk = data.sk.replace('%23', '#')
    const i = state.santri.findIndex((x) => x.SK === sk)

    // Membuat salinan data dan memperbarui salinan tersebut
    const updatedCatatanSantri = state.santri.map((item, index) => {
      if (index === i) {
        // Salinan data yang diperbarui
        const updatedItem = { ...item };

        // Memperbarui Logs dengan data baru
        updatedItem['Logs']['catatan'] = {
          ...updatedItem['Logs']['catatan'],
          pagi: {
            ...data.Pagi
          }
        };

        return updatedItem;
      }
      return item;
    });

    state.santri = updatedCatatanSantri
    $('#modalcatatanpagi').modal('hide')
    $('#formpagi')[0].reset()
  },
  deletecatatanpagi(state, data) {
    const sk = data.sk.replace('%23', '#')
    const i = state.santri.findIndex((x) => x.SK === sk)

    // Membuat salinan data dan memperbarui salinan tersebut
    const updatedCatatanSantri = state.santri.map((item, index) => {
      if (index === i) {
        // Salinan data yang diperbarui
        const updatedItem = { ...item };

        // Memperbarui Logs dengan data baru
        updatedItem['Logs']['catatan'] = {
          ...updatedItem['Logs']['catatan'],
          pagi: {
            ...data.pagi
          }
        };

        return updatedItem;
      }
      return item;
    });

    state.santri = updatedCatatanSantri
    $('#modalcatatanpagi').modal('hide')
    $('#formpagi')[0].reset()
  },
  setcatatansore(state, data) {
    const sk = data.sk.replace('%23', '#')
    const i = state.santri.findIndex((x) => x.SK === sk)

    // Membuat salinan data dan memperbarui salinan tersebut
    const updatedCatatanSantri = state.santri.map((item, index) => {
      if (index === i) {
        // Salinan data yang diperbarui
        const updatedItem = { ...item };

        // Memperbarui Logs dengan data baru
        updatedItem['Logs']['catatan'] = {
          ...updatedItem['Logs']['catatan'],
          sore: {
            ...data.Sore
          }
        };

        return updatedItem;
      }
      return item;
    });

    state.santri = updatedCatatanSantri
    $('#modalcatatansore').modal('hide')
    $('#formsore')[0].reset()
  },
  deletecatatansore(state, data) {
    const sk = data.sk.replace('%23', '#')
    const i = state.santri.findIndex((x) => x.SK === sk)

    // Membuat salinan data dan memperbarui salinan tersebut
    const updatedCatatanSantri = state.santri.map((item, index) => {
      if (index === i) {
        // Salinan data yang diperbarui
        const updatedItem = { ...item };

        // Memperbarui Logs dengan data baru
        updatedItem['Logs']['catatan'] = {
          ...updatedItem['Logs']['catatan'],
          sore: {
            ...data.sore
          }
        };

        console.log(updatedItem)

        return updatedItem;
      }
      return item;
    });

    state.santri = updatedCatatanSantri
    $('#modalcatatansore').modal('hide')
    $('#formsore')[0].reset()
  },

  //
  setMonitoring(state, data) {
    state.santri = [],
      state.listHalaqah = data
    state.monitoring = ''
  }
}
