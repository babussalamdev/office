const sekarang = new Date();

// Mendapatkan tanggal, bulan, dan tahun
const tanggal = sekarang.getDate().toString().padStart(2, '0');
const bulan = (sekarang.getMonth() + 1).toString().padStart(2, '0');
const tahun = sekarang.getFullYear();

// Membuat string untuk tanggal dengan format "DD/MM/YYYY"
const date = `${tahun}-${bulan}-${tanggal}`;
export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const result = await this.$apiBase.$get(`get-settings?sk=${program}&type=kelas`)
    if ( result ) {
      commit('setState', { key: 'kelas', value: result.kelas })
      commit('resetPage')
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async getSantri({ commit, state, dispatch}, data) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const value = state.selectedKelas.Nama
    const tahun = this.$auth.user.Label
    const semester = this.$auth.user.Semester
    const result = await this.$apiSantri.$get(`get-recapabsensi-sisalam?value=${value}&program=${program}&method=halaqah&thn=${tahun}&smstr=${semester}&startdate=${state.start}&enddate=${state.end}`)
    if (result) {
      const obj = { key: 'santri', value: result }
      commit('setState', obj)
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async getPageDetails({ commit, state, dispatch }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    commit('setState', { key: 'startdetail', value: date})
    commit('setState', { key: 'enddetail', value: date})
    const start = state.startdetail
    const end = state.enddetail
    const sk = data.replace('#', '%23')
    const result = await this.$apiSantri.$get(`get-recapabsensi-sisalam?program=${program}&details=halaqah&startdate=${start}&enddate=${end}&sksantri=${sk}`)
    if ( result ) {
      dispatch('index/submitLoad', null, { root: true })
      commit('setState', { key: 'details', value: result })
    }
  },
  async getDetails({ commit, state, dispatch }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const start = state.startdetail
    const end = state.enddetail
    const sk = data.replace('#', '%23')
    const result = await this.$apiSantri.$get(`get-recapabsensi-sisalam?program=${program}&details=halaqah&startdate=${start}&enddate=${end}&sksantri=${sk}`)
    if ( result ) {
      dispatch('index/submitLoad', null, { root: true })
      commit('setState', { key: 'details', value: result })
    }
  }
}
