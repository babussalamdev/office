import Swal from "sweetalert2"
export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    try {
      const result = await this.$apiOB.$get(`get-default?type=gedung`)
      if (result) {
        commit('setState', { key: 'listGedung', value: result })
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        icon: 'error',
        text: error,
        showConfirmButton: false,
        timer: 1500
      })
    }
  },
  async getRuangan({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const type = state.selectedGedung
    try {
      const result = await this.$apiOB.$get(`get-default?type=${type}`)
      if (result) {
        commit('setState', { key: 'ruangan', value: result })
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        icon: 'error',
        text: error,
        showConfirmButton: false,
        timer: 1500
      })
    }
  },
}
