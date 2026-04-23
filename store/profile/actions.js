export default {
  async showProfile({ commit }, data) {
    const result = await this.$apiBase.$get(`get-pegawai?type=profile`);
    commit("setProfile", result[0]);
  },
};
