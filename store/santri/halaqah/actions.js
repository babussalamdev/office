import Swal from "sweetalert2";
export default {
  async changeUnit({ commit }, data) {
    const program = localStorage.getItem('program')
    const result = await this.$axios.$get(
      `get-settings?type=options&sk=${program}&category=kelas`
    );
    commit('setSelectKelas', result);
  },
  async loadHalaqah({ commit, state }, data) {
    const program = localStorage.getItem('program')
    const reqSantri = this.$apiSantri.$get(
      `get-santri-sisalam?subject=kelas&program=${program}&opsi=halaqah&filter=${state.kelas}`
    );
    const reqSelect = this.$apiBase.$get(`get-settings?type=options&sk=${program}&category=halaqah`)
    const [resSantri, resSelect] = await Promise.all([reqSantri, reqSelect])
    const result = {
      resSantri, resSelect
    }
    commit('setSantri', result);
  },
  async updateDataSantriHalaqah({ commit, state }, event) {
    commit('btn')
    const data = {};
    const program = localStorage.getItem("program");
    data["value"] = state.asramaShow;
    data["sort"] = state.updateData;
    try {
      const result = await this.$apiSantri.$put(
        `update-santri-sisalam?sk&program=${program}&bulk=Halaqah`,
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
        commit('updateHalaqahSantri', data);
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
