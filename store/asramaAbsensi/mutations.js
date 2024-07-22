export default {
  setSantriAsrama(state, value) {
    // console.log(value)
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
    const data = state.santri[i]
    data['Logs'] = value.Logs
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
