export default {
  async changeUnit({ commit }) {
    const program = localStorage.getItem('program')
    const result = await this.$axios.$get(
      `get-settings?type=options&sk=${program}&category=kelas`
    );
    commit('setSelectKelas', result);
  },
  async loadEkskull({ commit }, data) {
    const reqSantri = await this.$apiSantri.$get(
      `get-santri-sisalam?subject=kelas&program=${data.program}&opsi=ekskull&filter=${data.kelas}`
    );
    const reqSelect = this.$apiBase.$get(`get-settings?type=options&sk=${data.program}&category=ekskull`)
    const [resSantri, resSelect] = await Promise.all([reqSantri, reqSelect])
    const result = { resSantri, resSelect }
    commit('setSantri', result);
  },

}
