export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const kelas = this.$auth.user.Kelas[program]
    const tahun = this.$auth.user.Label
    const semester = this.$auth.user.Semester
    if (kelas === 'off') {
      const result = await this.$apiBase.$get(`get-settings?sk=${program}&type=kelas`)
      commit('setState', { key: 'kelas', value: result.kelas })
      dispatch('index/submitLoad', null, { root: true })
    } else {
      const result = await this.$apiSantri.$get(`get-recapabsensi-sisalam?method=kelas&value=${kelas}&program=${program}&thn=${tahun}&smstr=${semester}`)
      if (result) {
        const obj = { key: 'santri', value: result }
        commit('setState', obj)
        dispatch('index/submitLoad', null, { root: true })
      }
    }
  },
  async getSantri({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const kelas = state.selectedKelas
    const tahun = this.$auth.user.Label
    const semester = this.$auth.user.Semester
    const result = await this.$apiSantri.$get(`get-recapabsensi-sisalam?method=kelas&value=${kelas}&program=${program}&thn=${tahun}&smstr=${semester}`)
    if (result) {
      const obj = { key: 'santri', value: result }
      commit('setState', obj)
      dispatch('index/submitLoad', null, { root: true })
    }
  }
}
