import Swal from "sweetalert2";
export default {
  async changeUnit({ commit }, data) {
    const result = await this.$axios.$get(
      `settings-get-struktur?sk=${data}`
    );
    commit('setStruktur', result);
  },
  async inputStruktur({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    data["Program"] = localStorage.getItem("program");
    data["Permissions"] = state.value.map((x) => x.name).join(",");
    try {
      const result = await this.$axios.$post(
        `settings-input-struktur`,
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
        `settings-update-struktur?sk=${key}`,
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
        console.log(data)
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
        `settings-delete-struktur?sk=${key}`
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
