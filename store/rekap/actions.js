export default {
  async changeUnit({ commit, state}) {
    const program = localStorage.getItem('program')
    const value = this.$auth.user.Halaqah[program]
    const tahun = this.$auth.user.Label
    const semester = this.$auth.user.Semester
    const result = await this.$apiSantri.$get(`get-tahfidz-sisalam?value=${value}&program=${program}&tahun=${tahun}&semester=${semester}&startdate=${state.start}&enddate=${state.end}`)
    const obj = { key: 'santri', value: result }
    commit('setState', obj)
  }
}
