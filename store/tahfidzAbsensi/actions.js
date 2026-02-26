import Swal from "sweetalert2";

export default {
  async changeUnit({ commit, dispatch, state }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");

    // --- 1. CHECK PERMISSIONS ---
    // Check if the user has access to Halaqah and/or HalaqahIdhofi for the current program
    const userHalaqah = this.$auth.user.Halaqah?.[program];
    const userHalaqahIdhofi = this.$auth.user.HalaqahIdhofi?.[program];

    const hasHalaqah = userHalaqah && userHalaqah !== "off";
    const hasIdhofi = userHalaqahIdhofi && userHalaqahIdhofi !== "off";

    // --- 2. AUTO-CORRECT SELECTED TYPE ---
    // If their current selection is invalid, switch it to one they have access to
    let type = state.selectedType;

    // NOTE: Based on your new template, the state value for idhofi is 'HalaqahIdhofi'
    // instead of 'idhofi'. I am using 'HalaqahIdhofi' to match your template option value.
    if (type === "halaqah" && !hasHalaqah && hasIdhofi) {
      type = "HalaqahIdhofi";
      commit("setState", { key: "selectedType", value: "HalaqahIdhofi" });
    } else if (type === "HalaqahIdhofi" && !hasIdhofi && hasHalaqah) {
      type = "halaqah";
      commit("setState", { key: "selectedType", value: "halaqah" });
    }

    // --- 3. DYNAMIC PARAMETERS ---
    const sessionType = type === "halaqah" ? "session" : "sessionidhofi";
    const namaSubject = type === "halaqah" ? this.$auth.user.Halaqah[program] : this.$auth.user.HalaqahIdhofi[program];

    // --- 4. FETCH DATA ---
    try {
      const reqAbsen = this.$apiBase.$get(`get-settings?type=${sessionType}&sk=${program}`);
      const reqSantri = this.$apiSantri.$get(`get-absensi-sisalam?type=every&subject=${type}&program=${program}&value=${namaSubject}`);

      const [resAbsen, resSantri] = await Promise.all([reqAbsen, reqSantri]);

      if (resAbsen && resSantri) {
        commit("setSantriTahfidz", resSantri);
        commit("setAbsen", resAbsen);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },
  async getAbsensi({ commit }, data) {
    const program = localStorage.getItem("program");
    const jabatan = this.$auth.user.Jabatan[program];
    const result = await this.$axios.$get(`get-absensi?subject=kelas&program=${program}&kelas=${data}&absen=asrama&name=${jabatan}`);

    commit("setSantriAsrama", result);
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
  async deleteStatus({ commit, state, dispatch, rootState }, datas) {
    dispatch("index/submitLoad", null, { root: true });
    const i = state.santri.findIndex((x) => x.SK === datas.sk);
    const data = state.santri[i];
    const time = datas.time;
    const type = state.selectedType.toLowerCase(); // Dynamic type

    // Dynamic property access (Logs.halaqah vs Logs.idhofi)
    const sk = data.Logs[type][time].time;
    const skSantri = datas.sk.replace("#", "%23");
    const tahun = rootState.index.label;
    const semester = rootState.index.semester;
    const program = localStorage.getItem("program");

    const req = await this.$apiSantri.$delete(
      `delete-absensi-sisalam?sksantri=${skSantri}&type=${type}${time}&thn=${tahun}&smstr=${semester}&program=${program}&sk=${sk}&status=${datas.condition}`,
    );
    if (req) {
      req["time"] = time;
      req["SK"] = datas.sk;
      commit("deleteAbsen", req);
    }
    dispatch("index/submitLoad", null, { root: true });
  },

  // catatan
  async updatecatatanpagi({ commit, state, rootState }, event) {
    const data = Object.fromEntries(new FormData(event.target));
    const skSantri = state.updateDataCatatan.SK.replace("#", "%23");
    const program = localStorage.getItem("program");
    commit("btncatatan");
    if (data.Note !== "") {
      const tahun = rootState.index.label;
      const semester = rootState.index.semester;
      const halaqah = state.updateDataCatatan.Halaqah;
      const result = await this.$apiSantri.$put(
        `update-catatan-sisalam?thn=${tahun}&smstr=${semester}&program=${program}&type=catatanpagi&sksantri=${skSantri}&halaqah=${halaqah}`,
        data,
      );
      if (result) {
        result["sk"] = skSantri;
        commit("setcatatanpagi", result);
        commit("btncatatan");
      }
    } else {
      const result = await this.$apiSantri.$delete(`delete-catatan-sisalam?program=${program}&type=catatanpagi&sksantri=${skSantri}`);
      if (result) {
        result["sk"] = skSantri;
        commit("deletecatatanpagi", result);
        commit("btncatatan");
      }
    }
  },
  async updatecatatansore({ commit, state, rootState }, event) {
    const data = Object.fromEntries(new FormData(event.target));
    const skSantri = state.updateDataCatatan.SK.replace("#", "%23");
    const program = localStorage.getItem("program");
    commit("btncatatan");
    if (data.Note !== "") {
      const tahun = rootState.index.label;
      const semester = rootState.index.semester;
      const halaqah = state.updateDataCatatan.Halaqah;
      const result = await this.$apiSantri.$put(
        `update-catatan-sisalam?thn=${tahun}&smstr=${semester}&program=${program}&type=catatansore&sksantri=${skSantri}&halaqah=${halaqah}`,
        data,
      );
      if (result) {
        result["sk"] = skSantri;
        commit("setcatatansore", result);
        commit("btncatatan");
      }
    } else {
      const result = await this.$apiSantri.$delete(`delete-catatan-sisalam?program=${program}&type=catatansore&sksantri=${skSantri}`);
      if (result) {
        result["sk"] = skSantri;
        commit("deletecatatansore", result);
        commit("btncatatan");
      }
    }
  },

  // monitoring
  async getDataMonitoring({ commit, state, dispatch }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const reqSettings = this.$apiBase.$get(`get-settings?sk=${program}&type=halaqah`);
    const reqAbsen = this.$apiBase.$get(`get-settings?type=session&sk=${program}`);
    const [resSettings, resAbsen] = await Promise.all([reqSettings, reqAbsen]);
    commit("setMonitoring", resSettings);
    commit("setAbsen", resAbsen);
    dispatch("index/submitLoad", null, { root: true });
  },
  async getUnitMonitoring({ commit, dispatch, state }, data) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");

    const reqSantri = await this.$apiSantri.$get(`get-absensi-sisalam?type=every&subject=halaqah&program=${program}&value=${state.monitoring}`);
    if (reqSantri) {
      commit("setSantriTahfidz", reqSantri);
      dispatch("index/submitLoad", null, { root: true });
    }
  },
};
