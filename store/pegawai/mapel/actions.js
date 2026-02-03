import Swal from "sweetalert2";
export default {
  async changeUnit({ commit }, data) {
    const result = await this.$apiBase.$get(
      // `get-settings?subject=opsimapel&program=${data}`
      `get-settings?sk=${data}&type=opsimapel`,
    );
    commit("setMain", result);
  },
  async getKelas({ commit }, data) {
    const result = await this.$apiBase.$get(`get-settings?type=setpengajar&sk=${data.program}&kelas=${data.kelas}&smstr=${data.semester}`);
    commit("setKelas", result);
  },
  async updateMapelSetup({ commit, state }, event) {
    commit("btn");
    const data = {};
    data["GSIPK1"] = state.pengajarShow.SK;
    data["Pengajar"] = state.pengajarShow.Nama;
    data["Hari"] = state.updateData.Hari;
    data["Nama"] = state.updateData.Nama;
    try {
      const key = state.updateData.SK.replace(/#/g, "%23");
      const result = await this.$apiBase.$put(`update-settings?type=mapel&sk=${key}`, data);
      if (result.message === "Terjadi Bentrok Jam Mengajar") {
        Swal.fire({
          position: "center",
          icon: "warning",
          text: result.message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        commit("btn");
        commit("setPengajar", result);
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      commit("btn");
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
};
