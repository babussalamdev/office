export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const semester = this.$auth.user.Semester
    const result = await this.$apiBase.$get(`get-settings?program=${program}&type=quran`)
    if (result.quran.length > 0) {
      const data = result.quran.filter(item => item.SK.includes(`${program}`) && item.SK.includes(`${semester}`))
      commit('setState', { key: 'listKelas', value: data })
      dispatch('index/submitLoad', null, { root: true })
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        text: "Penilaian untuk Tahfidz belum di setup",
      });
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async getSantri({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const datas = {}
    datas['Filter'] = 'koordinator';
    datas['Kelas'] = state.selectedKelas.SK.split('#')[1]
    datas['Subject'] = 'quran';
    datas['Tahun'] = this.$auth.user.Label
    datas['Semester'] = this.$auth.user.Semester
    datas['Penilaian'] = state.selectedKelas.Penilaian
    try {
      const result = await this.$apiSantri.$put(
        `get-nilai-sisalam?program=${program}`, datas
      )
      if (result) {
        const obj = { key: 'santri', value: result.data }
        commit('setState', obj)
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
