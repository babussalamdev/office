export default {
  async changeUnit({ commit }, data) {
    const result = await this.$apiBase.$get(
      `get-settings?subject=opsimapel&program=${data}`
    );
    commit('setMain', result);
  },
  async getKelas({ commit }, data) {
    const result = await this.$apiBase.$get(
      `get-settings?subject=setpengajar&program=${data.program}&kelas=${data.kelas}`
    )
    console.log()
    commit('setKelas', result)
  }
}
