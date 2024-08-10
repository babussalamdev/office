export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  setLoad(state, data) {
    state.btn = state.btn ? false : true
  },
  setSantri(state, value) {
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
  setSantriManual(state, value) {
    state.santri = value.resSantri
    state.permissions = value.resPermissions.split(',')
  },
  // update data di store
  updateData(state, value) {
    state.updateData = value
  },
  updatePelanggaran(state, value) {
    const i = state.santri.findIndex((x) => x.SK === value.key)
    const data = state.santri[i]
    data['Pelanggaran'] = value.Pelanggaran
    data['Poin'] = value.Poin
    // data['WaktuAsrama'] = value.WaktuAsrama

    const updateData = state.santri.map((item, index) => {
      if (index === i) {
        return data
      }
      return item
    })

    state.santri = updateData
    $("#inputForm")[0].reset()
    $("#inputModal").modal("hide");
  },

  // record
  setRecord(state, value) {
    state.record = value
  },
  updateRecordPelanggaran(state, value) {
    const i = state.record.findIndex((x) => x.SK === value.key)
    const data = state.record[i]
    data.Pelanggaran = value.Pelanggaran
    data.Level = value.Level
    data.Poin = value.Poin
    data.Tindakan = value.Tindakan
  }
}
