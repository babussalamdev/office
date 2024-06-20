import Swal from "sweetalert2";
export default {
  async changeUnit({ commit }, data) {
    const result = await this.$axios.$get(
      `get-settings?sk=${data}&type=kaldik`
    );
    commit('setkaldik', result);
  },
  async inputKaldik({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const program = localStorage.getItem('program')
    data["Program"] = program
    try {
      const result = await this.$axios.$post(
        `input-settings?sk=${program}&type=kaldik`,
        data
      );
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Data berhasil di input",
        showConfirmButton: false,
        timer: 1500,
      });
      commit('btn')
      commit('inputKaldik', result);
    } catch (error) {
      this.btn = true;
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async updateKaldik({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const key = state.updateData.SK.replace('#', '%23');
    try {
      const result = await this.$axios.$put(
        `update-settings?sk=${key}&type=kaldik`,
        data
      );
      if(result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil di input",
          showConfirmButton: false,
          timer: 1500,
        });
        commit('btn')
        data["SK"] = key;
        commit('updateKaldik', data);
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
  async deleteItem({commit, state}, sk) {
    const i = state.kaldik.findIndex((x) => x.SK === sk)
    const name = state.kaldik[i].Nama
    const key = sk.replace('#', '%23')
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
      await this.$axios.$delete(
        `delete-settings?sk=${key}&type=kaldik`
      );
      commit('deleteKaldik', sk);
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Data berhasil dihapus!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
}
