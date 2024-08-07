import Swal from "sweetalert2";
export default {
  async changeUnit({ commit, state, dispatch }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    const reqSantri = this.$apiSantri.$get(
      `get-santri-sisalam?subject=${state.angkatan}&program=${program}&opsi=kelas`
    );
    const reqKelas = this.$apiBase.$get(`get-settings?sk=${program}&type=kelas`)
    const [resSantri, resKelas] = await Promise.all([reqSantri, reqKelas])

    commit('setSantri', resSantri);
    commit('setKelas', resKelas);
    dispatch('index/submitLoad', null, { root: true })
  },
  async updateDataSantriKelas({ commit, state }, event) {
    commit('btn')
    const data = {};
    const program = localStorage.getItem("program");
    data["value"] = state.kelasShow;
    data["sort"] = state.updateData;
    try {
      const result = await this.$apiSantri.$put(
        `update-santri-sisalam?sk&program=${program}&bulk=Kelas`,
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
