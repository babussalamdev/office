import Swal from "sweetalert2";
export default {
  async changeUnit({ commit }, data) {
    const program = localStorage.getItem('program')
    const result = await this.$axios.$get(
      `get-settings?type=options&sk=${program}&category=kelas`
    );
    commit('setSelectKelas', result);
  },
  async kelasLoad({ commit, state }) {
    const program = localStorage.getItem('program')
    const result = await this.$apiSantri.$get(
      `get-santri-sisalam?subject=kelas&program=${program}&opsi=asrama&filter=${state.kelas}`
    );
    commit('setSantri', result);
  },
  async updateDataSantriAsrama({commit, state}, event) {
    commit('btn')
    const data = {};
    const program = localStorage.getItem("program");
    data["value"] = state.asramaShow;
    data["sort"] = state.updateData;
    try {
      const result = await this.$axios.$put(
        `update-santri?sk&program=${program}&bulk=Asrama`,
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
        commit('updateAsramaSantri', data);
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
