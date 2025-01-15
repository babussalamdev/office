import Swal from "sweetalert2"
export default {
  async changeUnit({ commit, dispatch, state }) {
    dispatch('index/submitLoad', null, { root: true })
    try {
      const result = await this.$apiOB.$get(`get-default?type=gedung`)
      if (result) {
        commit('setState', { key: 'datas', value: result })
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      })
    }
  },
  async inputData({ commit, dispatch, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    try {
      const result = await this.$apiOB.$post(`input-default?type=gedung`, data)
      if (result) {
        commit('setInputData', result)
        commit('btn')
      }
    } catch (error) {
      commit('btn')
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      })
    }
  },
  async deleteItem({ commit, state }, sk) {
    const result = await Swal.fire({
      title: sk,
      text: "Data akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await this.$apiOB.$delete(
        `delete-default?type=gedung&sk=${sk}`
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
  },
  async updateItem({ commit, state, dispatch }, { sk, status }) {
    dispatch('index/submitLoad', null, { root: true })
    const changeStatus = status === 'active' ? 'inactive' : 'active'
    try {
      const result = await this.$apiOB.$put(`update-default?value=gedung&sk=${sk}`, { Status: changeStatus })
      if (result) {
        dispatch('index/submitLoad', null, { root: true })
        commit('updateItem', { sk, changeStatus })
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil diupdate!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }
}
