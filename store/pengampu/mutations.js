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
}
