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
    const data = Object.fromEntries(new FormData(event.target))
    try {
      const result = await this.$apiLaundry.$put(`update-default?value=bag&sk=${state.updateData.BagID}`, data)
      if (result) {
        commit('updateData', result)
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });

    }
  },
  async editRegisterToActive({ commit, dispatch, state }, sk) {
    const i = state.datas.findIndex((x) => x.SK === sk)
    const name = state.datas[i].Name
    const bag = state.datas[i].Bag
    const result = await Swal.fire({
      title: 'Warning!',
      text: `${name} - ${bag}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await this.$apiLaundry.$delete(
        `delete-default?value=inventory&sk=${sk}`
      );
      commit('deleteItem', sk);
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Data berhasil dihapus!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
