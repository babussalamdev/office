import Swal from "sweetalert2";
export default {
  async changeUnit({ commit, state }, data) {
    const program = localStorage.getItem('program')
    const result = await this.$axios.$get(
      `get-santri?subject=${state.angkatan}&program=${program}&opsi=kelas`
    );
    commit('setDatabase', result);
  },
  async updateDataSantriKelas({ commit, state }, event) {
    commit('btn')
    const data = {};
    const program = localStorage.getItem("program");
    data["value"] = state.kelasShow;
    data["sort"] = state.updateData;
    try {
      const result = await this.$axios.$put(
        `update-santri?sk&program=${program}&bulk=Kelas`,
        data
      );
      if (result) {
        commit('btn')
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        commit('updateKelasSantri', data);
      }
    } catch (error) {
      commit('btn')
      console.log(error);
      Swal.fire({
        text: error,
        icon: "error",
        timer: 3000,
        timerProgressBar: false,
        showConfirmButton: false,
      });
    }
  },
}
