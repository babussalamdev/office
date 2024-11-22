export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const value = this.$auth.user.Halaqah[program]
    const tahun = this.$auth.user.Label
    const semester = this.$auth.user.Semester
    const result = await this.$apiSantri.$get(`get-tahfidz-sisalam?type=recap&halaqah=${value}&program=${program}&thn=${tahun}&smstr=${semester}&startdate=${state.start}&enddate=${state.end}&searchterm=tahsin`)
    if (result) {
      const obj = { key: 'santri', value: result }
      commit('setState', obj)
      dispatch('index/submitLoad', null, { root: true })
    }
  },
}
