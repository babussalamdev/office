import Swal from "sweetalert2";
export default {
  async changeUnit({ commit, dispatch, state }) {
    dispatch('index/submitLoad', null, { root: true })
    const today = new Date().toISOString().split('T')[0];
    commit('setState', { key: 'date', value: today })
    const program = localStorage.getItem('program')
    try {
      const result = await this.$apiLaundry.$get(`report-laundry?type=pinaltiy&program=${program}&date=${state.date}`)
      if (result) {
        commit('setPage', result)
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
    }
  },
  async getDataByDate({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    try {
      const result = await this.$apiLaundry.$get(`report-laundry?type=pinaltiy&program=${program}&date=${state.date}`)
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
  async editItem({ commit, state, dispatch }, { sk, type }) {
    const data = state.datas.find((x) => x.SK === sk)
    const datas = {
      "PKLaundry": data.PK,
      "SKLaundry": data.SK,
      "Transaction": "debit",
      "Type": "penalty payments",
      "Supplier": data.Name, // Nama Santri
      "Amount": data.Amount,
      "Unit": type //cash/transfer
    }
    try {
      const result = await this.$apiLaundry.$post(`input-finance?type=inventory`, datas)
      if (result) {
        result['SK'] = sk
        commit('editItem', result)
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
}
