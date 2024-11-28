export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const result = await this.$apiBase.$get(`get-settings?sk=${program}&type=kelas`)
    if (result) {
      const kelas = this.$auth.user.Kelas[program]
      if (kelas !== 'off') {
        const changedKelas = [{ Nama: kelas }]
        commit('setState', { key: 'listKelas', value: changedKelas })
      } else {
        commit('setState', { key: 'listKelas', value: result.kelas })
      }
      commit('resetPage')
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async getSantri({ commit, state, dispatch }) {
    const start = state.start
    const end = state.end
    if (start && end) {
      dispatch('index/submitLoad', null, { root: true })
      const kelas = state.selectedKelas.Nama
      const program = localStorage.getItem('program')
      const tahun = this.$auth.user.Label
      const semester = this.$auth.user.Semester
      const result = await this.$apiSantri.$get(`get-tahfidz-sisalam?type=report&kls=${kelas}&program=${program}&thn=${tahun}&smstr=${semester}&startdate=${start}&enddate=${end}&searchterm=tahsin`)
      if (result) {
        dispatch('index/submitLoad', null, { root: true })
        commit('setState', { key: 'santri', value: result })
      } else {
        console.log('error')
      }
    }
  }
}
