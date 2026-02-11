export default {
  async showWalas({ commit, rootState }, data) {
    const result = await this.$axios.get(`get-pegawai?program=${data}&opsi=kelas&position=wali kelas`);
    const label = rootState.index.label;
    const semester = rootState.index.semester;
    commit("setPeriode", { label, semester });
    commit("setWalas", result);
  },
};
