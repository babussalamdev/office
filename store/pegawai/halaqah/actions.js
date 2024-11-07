export default {
  async changeUnit({ commit, dispatch }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const result = await this.$axios.get(`get-pegawai?program=${data}&opsi=halaqah&position=Pengampu`)
    commit('setMusyrif', result)
    dispatch('index/submitLoad', null, { root: true })
  },
}
