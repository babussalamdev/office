import Swal from "sweetalert2";
export default {
  async getAbsensi({ commit }, data) {
    const result = await this.$axios.$get(
      `settings-get-absensi?sk=${data}`
    );
    commit('setAbsensi', result);
  },
  async changeUnitAsrama({ commit }, data) {
    const result = await this.$axios.$get(
      `get-database?subject=asrama&program=${data}`
    );
    commit('setDataAsrama', result);
  },
  async inputStruktur({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    data["Program"] = localStorage.getItem("program");
    data["Permissions"] = state.value.map((x) => x.name).join(",");
    try {
      const result = await this.$axios.$post(
        `settings-input-absensi`,
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
      commit("inputStruktur", result);
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
  async updateStruktur({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    data["Permissions"] = state.value.map((x) => x.name).join(",");
    data['Program'] = localStorage.getItem('program')
    const key = state.updateData.SK.replace('#', '%23');
    try {
      console.log(data)
      const result = await this.$axios.$put(
        `settings-update-absensi?sk=${key}`,
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
        result["SK"] = key;
        commit('updateStruktur', result);
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
    const i = state.absensi.findIndex((x) => x.SK === sk)
    const name = state.absensi[i].Nama
    const key = state.absensi[i].SK.replace('#', '%23')
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
        `settings-delete-absensi?sk=${key}`
      );
      commit('deleteStruktur', key);
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
