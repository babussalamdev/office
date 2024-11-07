import Swal from "sweetalert2";
export default {
  async getPelanggaran({ commit }, data) {
    const result = await this.$axios.$get(
      `get-settings?sk=${data}&type=pelanggaran`
    );
    commit('setPelanggaran', result);
  },
  async changeUnitAsrama({ commit }, data) {
    const result = await this.$axios.$get(
      `get-database?subject=asrama&program=${data}`
    );
    commit('setDataAsrama', result);
  },
  async inputDataPelanggaran({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    data["Program"] = localStorage.getItem("program");
    data["Permissions"] = state.value.map((x) => x.name).join(",");
    try {
      const result = await this.$axios.$post(
        `input-settings?type=pelanggaran`,
        data
      );
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil di input",
          showConfirmButton: false,
          timer: 1500,
        });
        commit('btn')
        commit('inputStruktur', result);
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
  async updateDataPelanggaran({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    data["Permissions"] = state.value.map((x) => x.name).join(",");
    const key = state.updateData.SK.replace('#', '%23');
    try {
      const program = localStorage.getItem("program");
      const result = await this.$axios.$put(
        `update-settings?sk=${key}&type=pelanggaran`,
        data
      );
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil diupdate",
          showConfirmButton: false,
          timer: 1500,
        });
        result["SK"] = key;
        commit('updateStruktur', result);
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

  async deleteItem({ commit, state }, sk) {
    const result = await Swal.fire({
      title: "Apakah anda yakin?",
      text: "Data akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      const key = sk.replace('#', '%23')
      await this.$axios.$delete(
        `delete-settings?sk=${key}&type=pelanggaran`
      );
      commit('deleteStruktur', sk);
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  },
}
