import Swal from "sweetalert2"
export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const result = await this.$apiBase.$get(`get-settings?type=absensikelas&program=${program}`)
    if (result.length > 0) {
      dispatch('index/submitLoad', null, { root: true })
      commit('setState', { key: 'datas', value: result })
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        text: "Anda tidak mengajar apapun hari ini",
      });
      dispatch('index/submitLoad', null, { root: true })
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

  // input
  async submit({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    data['Session'] = state.schedule.Hari
    data['Subject'] = state.schedule.Nama
    const program = localStorage.getItem('program')
    const tahun = this.$auth.user.Label
    const semester = this.$auth.user.Semester
    const kelas = state.schedule.Kelas
    const result = await this.$apiBase.$post(`input-journal?type=journal&program=${program}&thn=${tahun}&smstr=${semester}&kls=${kelas}`, data)
    if ( result ) {
      commit('btn')
      commit('setValues', result)
    }
  },
  async update({ commit, state}, event ) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    data['Session'] = state.updateData.Session
    const program = localStorage.getItem('program')
    const kelas = state.selectedKelas
    const sk = state.updateData.SK.replace(/#/g, '%23')
    const result = await this.$apiBase.$put(`update-journal?type=journal&program=${program}&kls=${kelas}&sk=${sk}`, data)
    if ( result ) {
      commit('updateValues', result)
      commit('btn')
    }
  }
}
