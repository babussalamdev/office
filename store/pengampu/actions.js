export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const reqPegawai = await this.$apiBase.$get(
      `get-absensi?program=${program}&type=absensipengampu`
    );
    if ( reqPegawai ) {
      commit('setPegawai', reqPegawai);
      dispatch('index/submitLoad', null, { root: true })
    }
  }
}
