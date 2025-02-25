export default {
  async setMainChart({ commit, dispatch }, data) {
    dispatch('index/submitLoad', null, { root: true })
    if (data === 'root') {
      const result = await this.$apiBase.$get(
        `get-dashboard?program=${data}`
      );
      commit('setChartAdmin', result);
      dispatch('index/submitLoad', null, { root: true })
    } else if (data === 'sarpras') {
      const jabatan = this.$auth.user.Jabatan?.sarpras
      const result = await this.$apiOB.$get(`get-dashboard?jabatan=${jabatan}`)
      commit('setChartSarpras', result)
      dispatch('index/submitLoad', null, { root: true })
    } else {
      const result = await this.$apiSantri.$get(
        `get-dashboard-sisalam?program=${data}`
      );
      commit('setChart', result);
      dispatch('index/submitLoad', null, { root: true })
      // const program = localStorage.getItem('program')
      // const result = await this.$apiBase.$get(
      //   `get-dashboard?program=${program}`
      // );
      // commit('setChart', result);
    }
  },
}
