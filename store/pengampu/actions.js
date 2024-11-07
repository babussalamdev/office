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
  },
  async deleteStatus({ commit, state }, datas) {
    const req = await this.$apiBase.$delete(
      `delete-absensi?type=pengampu${datas.time}&skpegawai=${datas.sk}`
    );
    req['time'] = datas.time
    req["SK"] = datas.sk;
    commit('deleteAbsen', req);
  },
}
