export default {
  async dataLaundryAdd({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    commit('setData')
    this.$router.push('/laundry/nota/2%23080824')
    commit('btn')
  },
  async dataLaundryEdit({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    commit('btn')
  }
}
