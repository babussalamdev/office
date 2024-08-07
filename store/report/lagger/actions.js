export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const tahun = this.$auth.user.Label
    const semester = this.$auth.user.Semester
    const kelas = this.$auth.user.Kelas[program]
    const result = await this.$apiSantri.$get(`get-leger-sisalam?program=${program}&tahun=${tahun}&semester=${semester}&kelas=${kelas}`)
    if ( result ) {
      const obj = { key: 'santri', value: result }
      commit('setState', obj)
      dispatch('index/submitLoad', null, { root: true })
    }
  },
}
