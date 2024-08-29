export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const tahun = this.$auth.user.Label
    const semester = this.$auth.user.Semester
    const reqPegawai = await this.$apiBase.$get(
      `get-absensi?type=pengampu&program=smp&startdate=2024-08-01&endate=2024-08-29`
    );
    if ( reqPegawai ) {
      commit('setPegawai', reqPegawai);
      dispatch('index/submitLoad', null, { root: true })
    }
  }
}
