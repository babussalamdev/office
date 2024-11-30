import Swal from "sweetalert2"
export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    try {
      const result = await this.$apiLaundry.$get(`get-default?value=inventory`)
      if ( result ) {
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
  async addData({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    data['Qty'] = +data.Qty
    data['Amount'] = +data.Amount
    try {
      const result = await this.$apiLaundry.$post(`input-default?value=inventory`, data)
      if (result) {
        commit('addData', result)
        commit('btn')
        Swal.fire({
          icon: "success",
          text: 'Data berhasil ditambahkan!',
          showConfirmButton: false,
          timer: 1500,
        });
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
  }
}
