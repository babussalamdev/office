import Swal from "sweetalert2"
export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const kelas = this.$auth.user.Kelas[program]

    if ( kelas === 'off' ) {
      const listKelas = await this.$apiBase.$get(`get-settings?type=options&sk=${program}&category=kelas`)
      commit('setState', { key: 'kelas', value: listKelas })
      dispatch('index/submitLoad', null, { root: true })
      return
    }

    const result = await this.$apiBase.$get(
      `get-settings?sk=${program}%23${kelas}&type=mapel`
    )
    commit('setMapel', result)
    dispatch('index/submitLoad', null, { root: true })
  },

  async getMapel({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const kelas = state.selectedKelas

    const result = await this.$apiBase.$get(
      `get-settings?sk=${program}%23${kelas}&type=mapel`
    )
    commit('setMapel', result)
    dispatch('index/submitLoad', null, { root: true })
  },

  async getSantri({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const datas = {}
    datas['Filter'] = state.selectedMapel.Jurusan
    datas['Kelas'] = state.selectedMapel.Kelas
    datas['Subject'] = state.selectedMapel.Nama
    datas['Tahun'] = this.$auth.user.Label
    datas['Semester'] = this.$auth.user.Semester
    datas['Penilaian'] = state.selectedMapel.Penilaian
    datas['Type'] = 'walas'
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
