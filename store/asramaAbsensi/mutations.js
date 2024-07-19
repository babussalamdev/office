export default {
  setSantriAsrama(state, value) {
    if (value) {
      state.santri = value.resSantri
      state.permissions = value.resPermissions.split(',')
      if (value.select) {
        state.select = value.select
      }
    } else {
      state.select = value
      state.santri = []
      state.permissions = []
    }

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
