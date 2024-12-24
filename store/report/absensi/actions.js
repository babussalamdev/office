export default {
  async changeUnit({ commit, state, dispatch, rootState }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const kelas = this.$auth.user.Kelas[program]
    const tahun = rootState.index.label
    const semester = rootState.index.semester
    const start = state.start
    const end = state.end
    if (kelas === 'off') {
      const result = await this.$apiBase.$get(`get-settings?sk=${program}&type=kelas`)
      commit('setState', { key: 'kelas', value: result.kelas })
      dispatch('index/submitLoad', null, { root: true })
    } else {
      const result = await this.$apiSantri.$get(`get-recapabsensi-sisalam?method=kelas&value=${kelas}&program=${program}&thn=${tahun}&smstr=${semester}&startdate=${start}&enddate=${end}`)
      if (result) {
        const obj1 = { key: 'santri', value: result }
        const obj2 = { key: 'selectedKelas', value: kelas }
        commit('setState', obj1)
        commit('setState', obj2)
        dispatch('index/submitLoad', null, { root: true })
      }
    }
  },
  async getSantri({ commit, state, dispatch, rootState }) {
    const program = localStorage.getItem('program')
    const kelas = state.selectedKelas
    const tahun = rootState.index.label
    const semester = rootState.index.semester
    const start = state.start
    const end = state.end
    if (start && end) {
      dispatch('index/submitLoad', null, { root: true })
      const result = await this.$apiSantri.$get(`get-recapabsensi-sisalam?method=kelas&value=${kelas}&program=${program}&thn=${tahun}&smstr=${semester}&startdate=${start}&enddate=${end}`)
      if (result) {
        const obj = { key: 'santri', value: result }
        commit('setState', obj)
        dispatch('index/submitLoad', null, { root: true })
      }
    }
  }
}
