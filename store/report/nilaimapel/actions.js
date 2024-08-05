export default {
  async changeUnit({ commit, state }) {
    const program = localStorage.getItem('program')
    const kelas = this.$auth.user.Kelas[program]
    const result = await this.$apiBase.$get(
      `get-settings?sk=${program}%23${kelas}&type=mapel`
    )
    commit('setMapel', result)
  },

  async getSantri({ commit, state }) {
    const program = localStorage.getItem('program')
    const datas = {}
    datas['Filter'] = state.selectedMapel.Jurusan
    datas['Kelas'] = state.selectedMapel.Kelas
    datas['Subject'] = state.selectedMapel.Nama
    datas['Tahun'] = this.$auth.user.Label
    datas['Semester'] = this.$auth.user.Semester
    datas['Penilaian'] = state.selectedMapel.Penilaian
    datas['Type'] = 'walas'
    const result = await this.$apiSantri.$put(
      `get-nilai-sisalam?program=${program}`, datas
    )
    const obj = { key: 'santri', value: result.data }
    commit('setState', obj)
  }
}
