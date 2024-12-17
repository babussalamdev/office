import Swal from "sweetalert2"
export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    try {
      const result = await this.$apiLaundry.$get(`get-default?value=inventory`)
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
  async addData({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    data['QTY'] = +data.QTY
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
  },
  async editItem({ commit, state }, event) {
    commit('btn')
    const datas = Object.fromEntries(new FormData(event.target))
    datas['QTY'] = +datas.QTY
    datas['Amount'] = +datas.Amount
    const sk = state.updateData.SK
    try {
      const result = await this.$apiLaundry.$put(`update-default?value=inventory&sk=${sk}`, datas);
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil di update",
          showConfirmButton: false,
          timer: 1500,
        });
        commit('btn')
        datas["SK"] = sk;
        commit('updateData', datas);
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
  async deleteItem({ commit, state }, sk) {
    const i = state.datas.findIndex((x) => x.SK === sk)
    const name = state.datas[i].Name
    const result = await Swal.fire({
      title: name,
      text: "Data akan dihapus secara permanen!",
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
