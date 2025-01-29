import Swal from "sweetalert2"
export default {
  async changeUnit({ commit, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    try {
      const result = await this.$apiBase.$get(`get-pegawai?type=program&program=sarpras`)
      if (result) {
        commit('setState', { key: 'datas', value: result })
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        text: error,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async updateJabatan({ commit, dispatch, state }) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const program = localStorage.getItem("program");
    data["Program"] = program;
    console.log(data, state.updateData)
    try {
      const username = state.updateData.Username;
      const id = state.updateData.SK;
      const result = await this.$axios.$put(
        `update-pegawai?subject=Jabatan&username=${username}&sk=${id}`,
        data
      );
      commit('btn')
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Data berhasil di input",
        showConfirmButton: false,
        timer: 1500,
      });
      result["SK"] = id;
      commit('updatePegawaiJabatan', result);
    } catch (error) {
      commit('btn')
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
