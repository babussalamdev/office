export default {
  async setMainChart({ commit }, data) {
    if (data === 'root') {
      const result = await this.$apiBase.$get(
        `get-dashboard?program=${data}`
      );
      commit('setChartAdmin', result);
    } else {
      const result = await this.$apiSantri.$get(
        `get-dashboard-sisalam?program=${data}`
      );
      commit('setChart', result);
      // const program = localStorage.getItem('program')
      // const result = await this.$apiBase.$get(
      //   `get-dashboard?program=${program}`
      // );
      // commit('setChart', result);
    }
  },
}
