export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const result = await this.$apiBase.$get(`get-settings?sk=${program}&type=kelas`)
    if ( result ) {
      commit('setState', { key: 'kelas', value: result.kelas })
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async getSantri({ commit, state, dispatch}, data) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const value = state.selectedKelas.Nama
    const tahun = this.$auth.user.Label
    const semester = this.$auth.user.Semester
    const result = await this.$apiSantri.$get(`get-recapabsensi-sisalam?value=${value}&program=${program}&method=halaqah&thn=${tahun}&smstr=${semester}`)
    if (result) {
      const obj = { key: 'santri', value: result }
      commit('setState', obj)
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async getDetails({ commit, state, dispatch }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const start = state.start
    const end = state.end
    const sk = data.replace('#', '%23')
    const result = await this.$apiSantri.$get(`get-recapabsensi-sisalam?program=${program}&details=halaqah&startdate=${start}&enddate=${end}&sksantri=${sk}`)
    if ( result ) {
      dispatch('index/submitLoad', null, { root: true })
      commit('setState', { key: 'details', value: result })
    }
  }
}
