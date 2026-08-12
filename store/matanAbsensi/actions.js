import Swal from "sweetalert2";

export default {
  // Assuming other actions live here...

  async fetchKelasOptions({ commit, dispatch }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");

    try {
      const result = await this.$apiBase.$get(`get-settings?sk=${program}&type=kelas`);
      if (result && result.kelas) {
        // Only target the 'kelas' array from the API response
        commit("setKelasOptions", result.kelas);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },

  // 2. Fetch Matan based on selected Kelas
  async fetchMatanOptions({ commit, dispatch, state, rootState }) {
    dispatch("index/submitLoad", null, { root: true });

    const program = localStorage.getItem("program");
    const tahun = rootState.index.label;
    const kelas = state.selectedKelas.Nama; // Take class name dynamically

    if (!tahun || !kelas) {
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    try {
      const resSelect = await this.$apiBase.$get(`get-settings?type=absensimatan&program=${program}&tahun=${tahun}&kelas=${kelas}`);

      if (resSelect.length > 0) {
        commit("setSelect", resSelect);
      } else {
        commit("setSelect", []);
        Swal.fire({
          position: "center",
          icon: "warning",
          text: `Tidak ada matan untuk kelas ${kelas}`,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },

  // 3. Update Santri fetch to use dynamic Kelas
  async getDataSantri({ commit, dispatch, state }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const kelas = state.selectedKelas.Nama; // Take class name dynamically

    try {
      const result = await this.$apiSantri.$get(`get-absensi-sisalam?type=every&subject=kelas&program=${program}&value=${kelas}`);
      commit("setDataSantri", result);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
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
