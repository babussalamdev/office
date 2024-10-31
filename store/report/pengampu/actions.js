export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const result = await this.$apiBase.$get(`get-absensi?type=recappengampu&program=${program}&startdate=${state.start}&enddate=${state.end}`)
    if (result) {
      const obj = { key: 'pegawai', value: result }
      commit('setState', obj)
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async getDetails({ commit, state, dispatch }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const start = state.start
    const end = state.end
    const result = await this.$apiBase.$get(`get-absensi?startdate=${start}&enddate=${end}&type=pengampudetails&skpegawai=${data}`)
    if ( result ) {
      dispatch('index/submitLoad', null, { root: true })
      commit('setState', { key: 'details', value: result })
    }
  }
}
