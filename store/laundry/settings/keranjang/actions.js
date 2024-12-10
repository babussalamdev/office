export default {
  async changeUnit({ commit, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    try {
      const result = await this.$apiLaundry.$get(`get-laundry?program=${program}&type=chart`)
      if (result) {
        commit('setPage', result)
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async dataSettingKeranjangAdd({ commit, state }, event) {
    commit('btn')
    const program = localStorage.getItem('program')
    const data = Object.fromEntries(new FormData(event.target))
    try {
      const result = await this.$apiLaundry.$post(`input-laundry?program=${program}&type=chart`, data)
      if (result) {
        result['SK'] = result.SK.split('#')[1]
        commit('setAddNota', result)
        commit('btn')
      }
    } catch (error) {
      commit('btn')
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
}
