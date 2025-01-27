import Swal from "sweetalert2"
export default {
  async changeUnit({ commit, dispatch, state }) {
    dispatch('index/submitLoad', null, { root: true })
    try {
      const result = await this.$apiBase.$get(`get-authority`)
      if (result) {
        commit('setPage', result)

        const newData = state.authority || {};
        const newHeaders = { Nama: '' };

        for (const [key, value] of Object.entries(newData)) {
          newHeaders[key] = value;
        }
        commit('setState', { key: 'th', value: newHeaders });
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
  async changeAuthority({ commit, state, dispatch }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const value = data.event.target.checked ? 'on' : 'off'
    const previousValue = !data.event.target.checked ? 'on' : 'off'
    const datas = {
      Authority: data.type,
      Value: value
    }
    const newValue = { sk: data.sk, type: data.type, value: value }
    const PastValue = { sk: data.sk, type: data.type, value: previousValue }
    try {
      commit('changeAuthority', newValue)
      const result = await this.$apiBase.$put(`update-authority?sk=${data.sk}`, datas)
      dispatch('index/submitLoad', null, { root: true })
    } catch (error) {
      commit('changeAuthority', PastValue)
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
