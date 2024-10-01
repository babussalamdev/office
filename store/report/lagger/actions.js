import Swal from "sweetalert2"
export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const tahun = this.$auth.user.Label
    const semester = this.$auth.user.Semester
    const kelas = this.$auth.user.Kelas[program]

    if ( kelas === 'off') {
      const listKelas = await this.$apiBase.$get(`get-settings?type=kelas&sk=${program}`)
      commit('setState', { key: 'kelas', value: listKelas.kelas })
      dispatch('index/submitLoad', null, { root: true })
      return
    }
    try {
      const reqPenilaian = this.$apiBase.$get(`get-settings?program=${program}&type=penilaian`)
      const reqLeger = this.$apiSantri.$get(`get-leger-sisalam?program=${program}&tahun=${tahun}&semester=${semester}&kelas=${kelas}&methode=all`)
      const reqKelas = this.$apiBase.$get(`get-settings?sk=${program}&type=kelas`)
      const [resPenilaian, resLeger, resKelas] = await Promise.all([reqPenilaian, reqLeger, reqKelas])
      if ( reqLeger ) {
        commit('setState', { key: 'mapelSelect', value: resPenilaian.mapel })
        commit('setState', { key: 'quranSelect', value: resPenilaian.quran })
        commit('setState', { key: 'selectedMapel', value: ''})
        commit('setState', { key: 'selected', value: ''})
        commit('setState', { key: 'santri', value: resLeger })
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500
      });
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async changeUnitClass({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const tahun = this.$auth.user.Label
    const semester = this.$auth.user.Semester
    const kelas = state.selectedKelas

    try {
      const reqPenilaian = this.$apiBase.$get(`get-settings?program=${program}&type=penilaian`)
      const reqLeger = this.$apiSantri.$get(`get-leger-sisalam?program=${program}&tahun=${tahun}&semester=${semester}&kelas=${kelas}&methode=all`)
      const reqKelas = this.$apiBase.$get(`get-settings?sk=${program}&type=kelas`)
      const [resPenilaian, resLeger, resKelas] = await Promise.all([reqPenilaian, reqLeger, reqKelas])
      if ( reqLeger ) {
        commit('setState', { key: 'mapelSelect', value: resPenilaian.mapel })
        commit('setState', { key: 'quranSelect', value: resPenilaian.quran })
        commit('setState', { key: 'selectedMapel', value: ''})
        commit('setState', { key: 'selected', value: ''})
        commit('setState', { key: 'santri', value: resLeger })
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500
      });
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async getSantri({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const tahun = this.$auth.user.Label
    const semester = this.$auth.user.Semester
    const kelas = this.$auth.user.Kelas[program] === 'off' ? state.selectedKelas : this.$auth.user.Kelas[program]
    const type1 = state.selectedMapel
    const type2 = state.selectedQuran
    if ( state.selectedMapel && state.selectedQuran) {
      const result = await this.$apiSantri.$get(`get-leger-sisalam?program=${program}&tahun=${tahun}&semester=${semester}&kelas=${kelas}&methode=separate&type1=${type1}&type2=${type2}`)
      commit('setState', { key: 'santri', value: result })
      dispatch('index/submitLoad', null, { root: true })
    }
  }
}
