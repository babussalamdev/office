export default {
  async changeUnit({ commit, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const result = await this.$apiBase.$get(
      `get-settings?sk=${program}&type=opsimapel`
    );
    if ( result ) {
      commit('setState', { key: 'listKelas', value: result.kelas });
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async getMapel({ commit, state }, data) {
    const program = localStorage.getItem('program')
    const kelas = state.selectedKelas
    const result = await this.$apiBase.$get(
      `get-settings?sk=${program}%23${kelas}&type=mapel`
    )
    if ( result ) {
      commit('setState', { key: 'listMapel', value: result.mapel.map(item => item.Nama)})
    }
  },
  async getData({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    if (state.selectedMapel && state.selectedKelas) {
      const subject = state.selectedMapel
      const kelas = state.selectedKelas
      const tahun = this.$auth.user.Label
      const semester = this.$auth.user.Semester
      const result = await this.$apiBase.$get(`get-journal?type=journal&subject=${subject}&thn=${tahun}&smstr=${semester}&kls=${kelas}`)
      if (result) {
        commit('setState', { key: 'values', value: result })
        dispatch('index/submitLoad', null, { root: true })
      }
    }
  },

}
