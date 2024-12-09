import Swal from "sweetalert2"
export default {
  async changeUnit({ commit, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    try {
      const result = await this.$apiBase.$get(`get-settings?sk=${program}&type=asrama`)
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
  async getDataByAsrama({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const asrama = state.selectedAsrama
    try {
      const result = await this.$apiLaundry.$get(`get-bag?program=${program}&subject=asrama&value=${asrama}`)
      if (result) {
        commit('setGetData', result)
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
  async updateDataRegister({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    try {
      const result = await this.$apiLaundry.$put(`update-default?value=bag&sk=${state.updateData.BagID}`, data)
      if (result) {
        commit('btn')
        commit('updateData', result)
      }
    } catch (error) {
      console.log(error)
      commit('btn')
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });

    }
  },
  async editRegisterToActive({ commit, dispatch, state }, sk) {
    const i = state.datas.findIndex((x) => x.BagID === sk)
    const name = state.datas[i].Name
    const bag = state.datas[i].BagID
    const data = { Status: 'active' }
    const result = await Swal.fire({
      title: 'Warning!',
      text: `Aktifkan ${name} - ${bag} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Aktifkan!",
    });

    if (result.isConfirmed) {
      const datas = await this.$apiLaundry.$put(
        `update-default?value=bag&sk=${sk}`, data
      );
      datas['SK'] = sk
      commit('updateDataToActive', datas)
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Data berhasil dihapus!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async getModal({ state, commit, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const asrama = state.selectedAsramaModal
    try {
      const result = await this.$apiLaundry.$get(`get-bag?program=${program}&subject=asrama&value=${asrama}`)
      if (result) {
        commit('setGetDataModal', result)
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
  async addDataTag({ commit, state}, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    data['Name'] = state.selectedDataModal.Name
    data['Subject'] = state.selectedDataModal.SK
    try {
      const result = await this.$apiLaundry.$post(`input-bag`, data)
      commit('addTagToSantri', result)
      commit('btn')
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
