import state from "./state";
import Swal from "sweetalert2";
export default {
  async changeUnit({ commit, state }, data) {
    const program = localStorage.getItem('program')
    const result = await this.$apiSantri.$get(
      `get-santri-sisalam?subject=${state.angkatan}&program=${program}&opsi=none`
    );
    commit('setDatabase', result);
  },
  async inputSantri({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const program = localStorage.getItem("program");
    data["Password"] = state.password;
    data['Program'] = program
    try {
      const result = await this.$apiSantri.$post(
        `input-santri-sisalam?method=single`,
        data
      );
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        commit('btn')
        commit('inputSantriSingle', result);
      }
    } catch (error) {
      commit('btn')
      Swal.fire({
        text: error,
        icon: "error",
        timer: 3000,
        timerProgressBar: false,
        showConfirmButton: false,
      });
    }
  },
  async updateSantri({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const key = state.updateData.SK.replace('#', '%23');
    const program = localStorage.getItem("program");
    data['Program'] = program
    try {
      const result = await this.$apiSantri.$put(
        `update-santri-sisalam?sk=${key}`,
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
        data["SK"] = state.updateData.SK;
        commit('updateSantri', data);
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
  async deleteSantri({commit, state}, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const status = data.status;
    const note = data.alasan;
    const key = state.deleteData.SK.replace('#', '%23')
    const user = state.deleteData.Username;
    const program = localStorage.getItem("program");
    try {
      const result = await this.$apiSantri.$delete(
        `delete-santri-sisalam?username=${user}&sk=${key}&program=${program}&status=${status}&note=${note}`
      );
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil di non aktifkan",
          showConfirmButton: false,
          timer: 1500,
        });
        commit('btn')
        const shortKey = state.deleteData.SK;
        commit('deleteSantri', shortKey);
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
      commit('btn')
    }
  },
}
