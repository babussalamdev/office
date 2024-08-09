export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  setLoad(state, data) {
    state.btn = state.btn ? false : true
  },
  setSantriAsrama(state, value) {
    // console.log(value)
    state.santri = []
    state.search = ''
    state.selectKelas = ''
    if (value.resSelect) {
      state.select = value.resSelect
      state.santri = []
      state.permissions = []
    } else {
      state.santri = value.resSantri
      state.permissions = value.resPermissions.split(',')
      state.select = []
    }
  },
  setSantriAsramaManual(state, value) {
    state.santri = value.resSantri
    state.permissions = value.resPermissions.split(',')
  },
  updateAbsen(state, value) {
    const i = state.santri.findIndex((x) => x.SK === value.SK)
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

    $("#santriAbsenInput")[0].reset()
    $("#modalAbsen").modal("hide");
    // data['asrama'] = value.Logs.asrama
    // data['asramaNote'] = value.Logs.asramaNote
    // data['asramaTime'] = value.Logs.asramaTime

    // const updateData = state.santri.map((item, index) => {
    //     if (index === i) {
    //         return data
    //     }
    //     return item
    // })
    // console.log(updateData)
    // state.santri = updateData
  },
}
