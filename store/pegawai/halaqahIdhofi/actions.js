export default {
  async changeUnit({ commit, dispatch }, data) {
    dispatch("index/submitLoad", null, { root: true });
    const result = await this.$axios.get(`get-pegawai?program=${data}&opsi=halaqahidhofi&position=Pengampu`);
    console.log(result);

    commit("setMusyrif", result);
    dispatch("index/submitLoad", null, { root: true });
  },
};
