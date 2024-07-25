export default {
  async changeUnit({ commit }, data) {
    const result = await this.$apiBase.$get(
      // `get-settings?subject=opsimapel&program=${data}`
      `get-settings?sk=${data}&type=opsimapel`
    );
    commit('setMain', result);
  },
  async getKelas({ commit }, data) {
    const result = await this.$apiBase.$get(
      `get-settings?type=setpengajar&sk=${data.program}&kelas=${data.kelas}`
    )
    commit('setKelas', result)
  },
  async updateMapelSetup({commit, state}, event) {
    commit('btn')
    const data = {};
    data["GSIPK1"] = state.pengajarShow.SK;
    data["Hari"] = state.updateData.Hari;

    try {
      const key = state.updateData.SK;
      const result = await this.$apiBase.$put(
        `/update-database?subject=setpengajar&program=${key.split("#")[0]
        }&kelas=${key.split("#")[1]}&code=${key.split("#")[2]}`,
        data
      );
      if (result.message === "Terjadi Bentrok Jam Mengajar") {
        Swal.fire({
          position: "center",
          icon: "warning",
          text: result.message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        data["GSIPK1"] = state.pengajarShow.Nama;
        data["SK"] = key;
        commit('btn')
        this.$store.commit("pegawai/mapel/setPengajar", data);
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        this.$refs.updateMapelSetup.reset();
        $("#mapelSetupModal").modal("hide");
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
