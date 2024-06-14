import Swal from "sweetalert2";
export default {
  async changeUnitHalaqah({ commit }, data) {
    const result = await this.$axios.$get(
      `settings-get-halaqah?sk=${data}`
    );
    commit('setDataHalaqah', result);
  },
  async changeUnitAsrama({ commit }, data) {
    const result = await this.$axios.$get(
      `settings-get-asrama?sk=${data}`
    );
    commit('setDataAsrama', result);
  },
  async inputHalaqah({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    data["Program"] = localStorage.getItem("program");
    try {
      const result = await this.$axios.$post(
        "settings-input-halaqah",
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
        commit('updateHalaqah', result);
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
  async deleteHalaqah({ commit, state }, sk) {
    const i = state.halaqah.findIndex((x) => x.SK === sk)
    const name = state.halaqah[i].Nama
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
      const result = await this.$axios.$delete(
        `settings-delete-halaqah?sk=${key}`
      );
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
        commit('deleteHalaqah', key);
      }
    }
  },
  async inputAsrama({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    data["Program"] = localStorage.getItem("program");
    try {
      const result = await this.$axios.$post(
        `settings-input-asrama`,
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
        commit('updateAsrama', result);
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
    const i = state.asrama.findIndex((x) => x.SK === sk)
    const name = state.asrama[i].Nama
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
      const result = await this.$axios.$delete(
        `settings-delete-asrama?sk=${key}`
      );
      if (result) {
        commit('deleteAsrama', key);
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
