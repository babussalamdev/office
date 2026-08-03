import Swal from "sweetalert2";

export default {
  // Assuming other actions live here...

  async changeUnit({ commit, dispatch, state, rootState }, data) {
    dispatch("index/submitLoad", null, { root: true });

    const program = localStorage.getItem("program");
    const tahun = rootState.index.label;

    if (!tahun) {
      dispatch("index/submitLoad", null, { root: true });
      this.$router.push("/");
      return;
    }

    const kelas = this.$auth.user.Kelas[program];

    // Commit the user class options directly to the state for dropdown menu
    commit("setKelasOptions", kelas);

    const resSelect = await this.$apiBase.$get(`get-settings?type=absensimatan&program=${program}&tahun=${tahun}&kelas=${kelas}`);

    if (resSelect.length > 0) {
      commit("setSelect", resSelect);
      dispatch("index/submitLoad", null, { root: true });
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        text: "Anda tidak mengajar matan apapun",
      });
      dispatch("index/submitLoad", null, { root: true });
    }
  },

  async getDataSantri({ commit, dispatch }, data) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const kelas = this.$auth.user.Kelas[program];
    const result = await this.$apiSantri.$get(`get-absensi-sisalam?type=every&subject=kelas&program=${program}&value=${kelas}`);

    commit("setDataSantri", result);
    dispatch("index/submitLoad", null, { root: true });
  },
  setStatus({ commit, state }, data) {
    const waktu = data;
    const sk = state[data].split(" ")[1];
    const type = state[data].split(" ")[0];
    const obj = {
      waktu: waktu,
      sk: sk,
      type: type,
    };
    // console.log(data)
  },

  async santriAbsen({ commit, state, rootState }, event) {
    commit("btn");
    const data = Object.fromEntries(new FormData(event.target));
    data["Status"] = state.updateData.type;
    data["Matan"] = state.updateData.matan;
    const skSantri = state.updateData.santri.SK.replace("#", "%23");
    const tahun = rootState.index.label;
    const semester = rootState.index.semester;
    const time = "matan" + state.updateData.matan;
    const namakelas = state.updateData.santri.Kelas;
    const program = localStorage.getItem("program");
    console.log(data);
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
      console.log(error);
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
    const i = state.santri.findIndex((x) => x.SK === datas.sk);
    const data = state.santri[i];
    const time = "matan" + state.selectedMatan.Nama;
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
