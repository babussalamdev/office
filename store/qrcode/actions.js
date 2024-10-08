export default {
  async changeUnit({ commit, state, dispatch }) {
    const result = await this.$apiBase.$get(`get-settings?type=option`)
  },
  async getData({ commit, state, dispatch }) {
    const result = await this.$apiSantri.$get(`get-santri-sisalam?program=smp&opsi=8b&method=card&type=kelas`)
  }
}
