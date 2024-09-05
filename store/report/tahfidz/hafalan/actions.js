export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const result = await this.$apiBase.$get(`get-settings?sk=${program}&type=kelas`)
    if ( result ) {
      commit('setState', { key: 'listKelas', value: result.kelas })
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async getSantri({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const kelas = state.selectedKelas.Nama
    const program = localStorage.getItem('program')
    const tahun = this.$auth.user.Label
    const result = await this.$apiSantri.$get(`get-tahfidz-sisalam?type=report&kls=${kelas}&program=${program}&thn=${tahun}`)
    if ( result ) {
      dispatch('index/submitLoad', null, { root: true })
      commit('setState', { key: 'santri', value: result })
    } else {
      console.log('error')
    }
  }
}
