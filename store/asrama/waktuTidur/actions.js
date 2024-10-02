export default {
  async changeUnit({ state, dispatch, commit }) {
    const program = localStorage.getItem('program')
    const result = await this.$apiBase.$get(`get-settings?program=${program}&type=tidur`)
    if ( result ) {
      commit('setState', { key: 'datas', value: result })
    }
  }
}
