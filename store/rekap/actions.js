const sekarang = new Date();
const tanggal = sekarang.getDate().toString().padStart(2, '0');
const bulan = (sekarang.getMonth() + 1).toString().padStart(2, '0');
const tahun = sekarang.getFullYear();
const date = `${tahun}-${bulan}-${tanggal}`;

export default {
  async changeUnit({ commit, state, dispatch, rootState }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const value = this.$auth.user.Halaqah[program]
    const tahun = rootState.index.label
    const semester = rootState.index.semester

    commit('setState', { key: 'start', value: date})
    commit('setState', { key: 'end', value: date})

    if(!tahun && !semester) {
      dispatch('index/submitLoad', null, { root: true })
      return
    }

    const result = await this.$apiSantri.$get(`get-recapabsensi-sisalam?value=${value}&program=${program}&method=halaqah&thn=${tahun}&startdate=${state.start}&enddate=${state.end}&searchterm=Halaqah`)
    if (result) {
      const obj = { key: 'santri', value: result }
      commit('setState', obj)
      dispatch('index/submitLoad', null, { root: true })
    }
  },

  async getDataByDate({ commit, state, dispatch, rootState }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const value = this.$auth.user.Halaqah[program]
    const tahun = rootState.index.label
    const semester = rootState.index.semester

    if(!tahun && !semester) {
      dispatch('index/submitLoad', null, { root: true })
      return
    }

    const result = await this.$apiSantri.$get(`get-recapabsensi-sisalam?value=${value}&program=${program}&method=halaqah&thn=${tahun}&startdate=${state.start}&enddate=${state.end}&searchterm=Halaqah`)
    if (result) {
      const obj = { key: 'santri', value: result }
      commit('setState', obj)
      dispatch('index/submitLoad', null, { root: true })
    }
  },

  async getDetails({ commit, state, dispatch }, data) {
    dispatch('index/submitLoad', null, { root: true })

    commit('setState', { key: 'start', value: date})
    commit('setState', { key: 'end', value: date})

    const program = localStorage.getItem('program')
    const start = state.start
    const end = state.end
    const sk = data.replace('#', '%23')
    const result = await this.$apiSantri.$get(`get-recapabsensi-sisalam?program=${program}&details=halaqah&startdate=${start}&enddate=${end}&sksantri=${sk}`)
    if (result) {
      dispatch('index/submitLoad', null, { root: true })
      commit('setState', { key: 'details', value: result })
    }
  },
  async getDetailsByDate({ commit, state, dispatch }, data) {
    dispatch('index/submitLoad', null, { root: true })

    const program = localStorage.getItem('program')
    const start = state.start
    const end = state.end
    const sk = data.replace('#', '%23')
    const result = await this.$apiSantri.$get(`get-recapabsensi-sisalam?program=${program}&details=halaqah&startdate=${start}&enddate=${end}&sksantri=${sk}`)
    if (result) {
      dispatch('index/submitLoad', null, { root: true })
      commit('setState', { key: 'details', value: result })
    }
  }
}
