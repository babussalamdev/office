export default {
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
  updateAbsen(state, value) {
    const i = state.santri.findIndex((x) => x.SK === value.SK)
    const data = state.santri[i]
    if (value.time === 'Pagi') {
      data.Logs['halaqahPagi'] = value.Logs.halaqahPagi
      data.Logs['halaqahPagiNote'] = value.Logs.halaqahPagiNote
      data.Logs['halaqahPagiTime'] = value.Logs.halaqahPagiTime
    } else {
      data.Logs['halaqahSore'] = value.Logs.halaqahSore
      data.Logs['halaqahSoreNote'] = value.Logs.halaqahSoreNote
      data.Logs['halaqahSoreTime'] = value.Logs.halaqahSoreTime
    }
    state.updateData = ''
  },
  deleteAbsen(state, value) {
    const i = state.santri.findIndex((x) => x.SK === value.SK)
    const data = state.santri[i]
    if (value.time === 'Pagi') {
      data.Logs['halaqahPagi'] = value.Logs.halaqahPagi
      data.Logs['halaqahPagiNote'] = value.Logs.halaqahPagiNote
      data.Logs['halaqahPagiTime'] = value.Logs.halaqahPagiTime
    } else {
      data.Logs['halaqahSore'] = value.Logs.halaqahSore
      data.Logs['halaqahSoreNote'] = value.Logs.halaqahSoreNote
      data.Logs['halaqahSoreTime'] = value.Logs.halaqahSoreTime
    }
    state.updateData = ''
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
}
