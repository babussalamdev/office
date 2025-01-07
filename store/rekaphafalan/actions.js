export default {
  async changeUnit({ commit, state, dispatch, rootState }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const value = this.$auth.user.Halaqah[program]
    const tahun = rootState.index.label
    const semester = rootState.index.semester
    const result = await this.$apiSantri.$get(`get-tahfidz-sisalam?type=recap&halaqah=${value}&program=${program}&thn=${tahun}&startdate=${state.start}&enddate=${state.end}&searchterm=ziyadah`)
    if (result) {
      const obj = { key: 'santri', value: result }
      commit('setState', obj)
      dispatch('index/submitLoad', null, { root: true })
    }
  },
}
