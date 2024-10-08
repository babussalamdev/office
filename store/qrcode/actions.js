export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const reqKelas = this.$apiBase.$get(`get-settings?sk=${program}&type=kelas`)
    const reqSantri = this.$apiSantri.$get(`get-santri-sisalam?program=smp&opsi=&method=card&type=`)
    const [resKelas, resSantri] = await Promise.all([reqKelas, reqSantri])
    if ( resKelas, resSantri ) {
      commit('SET_STATE', { key: 'kelas', value: resKelas.kelas })
      commit('SET_STATE', { key: 'santri', value: resSantri })
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async getData({ commit, state, dispatch }) {
    console.log('ambil data')
    const kelas = state.selectedKelas
    try {
      const result = await this.$apiSantri.$get(`get-santri-sisalam?program=smp&opsi=${kelas}&method=card&type=kelas`)
      commit('SET_STATE', { key: 'santri', value: result })
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
