import Swal from "sweetalert2";

export default {
  // 1. Fetch Ekskull dropdown options
  async fetchEkskullOptions({ commit, dispatch }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");

    try {
      // Re-using the logic from your Jurnal endpoint
      const result = await this.$apiBase.$get(`get-settings?type=options&sk=${program}&category=ekskull`);
      if (result) {
        commit("setEkskullOptions", result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },

  // 2. Fetch Santri based directly on Ekskull selection
  async getDataSantri({ commit, dispatch, state }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const ekskull = state.selectedEkskull;

    if (!ekskull) {
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    try {
      // Changed subject to 'ekskull' and value to the selected option
      const result = await this.$apiSantri.$get(`get-absensi-sisalam?type=every&subject=ekskull&program=${program}&value=${ekskull}`);
      commit("setDataSantri", result);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },

  setStatus({ state }, data) {
    const waktu = data;
    const sk = state[data].split(" ")[1];
    const type = state[data].split(" ")[0];
    const obj = { waktu, sk, type };
  },

  async santriAbsen({ commit, state, rootState }, event) {
    commit("btn");
    const data = Object.fromEntries(new FormData(event.target));
    data["Status"] = state.updateData.type;
    data["Ekskull"] = state.updateData.ekskull;

    const skSantri = state.updateData.santri.SK.replace("#", "%23");
    const tahun = rootState.index.label;
    const semester = rootState.index.semester;
    const time = "ekskull" + state.updateData.ekskull;
    const namakelas = state.updateData.santri.Kelas;
    const program = localStorage.getItem("program");
    console.log(data);
    console.log({ skSantri, tahun, semester, time, namakelas, program });
    try {
      const result = await this.$apiSantri.$put(
        `update-absensi-sisalam?sksantri=${skSantri}&type=${time}&thn=${tahun}&smstr=${semester}&program=${program}&subject=${namakelas}`,
        data,
      );
      if (result) {
        commit("btn");
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil diupdate",
          showConfirmButton: false,
          timer: 1500,
        });
        result["time"] = time;
        result["SK"] = state.updateData.santri.SK;
        commit("updateAbsen", result);
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
      commit("btn");
    }
  },

  async deleteStatus({ commit, state, dispatch, rootState }, datas) {
    dispatch("index/submitLoad", null, { root: true });

    const time = "ekskull" + state.selectedEkskull;
    const skSantri = datas.sk.replace("#", "%23");
    const tahun = rootState.index.label;
    const semester = rootState.index.semester;
    const program = localStorage.getItem("program");

    const req = await this.$apiSantri.$delete(
      `delete-absensi-sisalam?sksantri=${skSantri}&type=${time.replace(
        " ",
        "%20",
      )}&thn=${tahun}&smstr=${semester}&program=${program}&sk=${skSantri}&status=${datas.condition}`,
    );
    req["time"] = time;
    req["SK"] = datas.sk;
    commit("deleteAbsen", req);
    dispatch("index/submitLoad", null, { root: true });
  },
};
