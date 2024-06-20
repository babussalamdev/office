import Swal from "sweetalert2";
export default {
  async changeUnit({ commit }, data) {
    const result = await this.$axios.$get(
      `get-settings?sk=${data}&type=struktur`
    );
    commit('setStruktur', result);
  },
  async inputStruktur({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const program = localStorage.getItem('program')
    data["Program"] = program
    data["Permissions"] = state.value.map((x) => x.name).join(",");
    try {
      const result = await this.$axios.$post(
        `input-settings?sk=${program}&type=struktur`,
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
      commit('inputStruktur', result);
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
    const key = state.updateData.SK.replace('#', '%23');
    try {
      const result = await this.$axios.$put(
        `update-settings?sk=${key}&type=struktur`,
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
        data["SK"] = key;
        commit('updateDataStruktur', data);
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
    const i = state.struktur.findIndex((x) => x.SK === sk)
    const name = state.struktur[i].Nama
    const key = state.struktur[i].SK.replace('#', '%23')
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
      const response = await this.$axios.$delete(
        `delete-settings?sk=${key}&type=struktur`
      );
      if (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
          });
        commit("deleteStruktur", key);
      }
    }
  },
  async openSettings({ commit }, value) {
    const key = value.key
    const data = {
      Program: value.unit,
      Value: value.condition
    }
    console.log(key)
    const result = await this.$axios.$put(`update-pegawai?subject=Settings&id=${key}`, data)
  },
}
