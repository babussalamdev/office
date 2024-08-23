import Swal from "sweetalert2";
export default {
  async changeUnit({ commit }) {
    const program = localStorage.getItem('program')
    const result = await this.$axios.$get(
      `get-settings?type=options&sk=${program}&category=kelas`
    );
    commit('setSelectKelas', result);
  },
  async loadEkskull({ commit, dispatch, state }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const kelas = state.kelas
    const reqSantri = await this.$apiSantri.$get(
      `get-santri-sisalam?subject=kelas&program=${program}&opsi=ekskull&filter=${kelas}`
    );
    const reqSelect = this.$apiBase.$get(`get-settings?type=options&sk=${program}&category=ekskull`)
    const [resSantri, resSelectArray] = await Promise.all([reqSantri, reqSelect])
    const resSelect = resSelectArray.map((sport, index) => ({
      name: sport,
      code: index
    }));
    const result = { resSantri, resSelect }
    if (result) {
      commit('setSantri', result);
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async updateDataSantriEkskull({ commit, state }) {
    commit('btn')
    const data = {};
    const program = localStorage.getItem("program");
    data["value"] = state.ekskullShow.map((x) => x.name).join(",")
    data["sort"] = state.data
    try {
      const result = await this.$apiSantri.$put(
        `update-santri-sisalam?sk&program=${program}&bulk=Ekskull`,
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
        commit("updateEkskullSantri", data);
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
