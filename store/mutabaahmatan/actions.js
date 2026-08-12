import Swal from "sweetalert2";

export default {
  async changeUnit({ commit, state, dispatch, rootState }, isManualChange = true) {
    dispatch("index/submitLoad", null, { root: true });

    const program = localStorage.getItem("program");
    const tahun = rootState.index.label;

    if (!tahun) {
      dispatch("index/submitLoad", null, { root: true });
      this.$router.push("/");
      return;
    }

    try {
      // 1. Fetch Class list dynamically if it's empty
      if (!state.kelas || state.kelas.length === 0) {
        const resKelas = await this.$apiBase.$get(`get-settings?sk=${program}&type=kelas`);
        const kelasArray = resKelas.kelas || [];

        commit("setState", { key: "kelas", value: kelasArray });

        // Auto-select the first class if none is selected
        if (kelasArray.length > 0 && !state.selectedKelas) {
          commit("setState", { key: "selectedKelas", value: kelasArray[0].Nama });
        }
      }

      const activeKelas = state.selectedKelas;

      if (!activeKelas) {
        commit("setMatanList", []);
        return;
      }

      // 2. Fetch Matan based on the active class
      const resSelect = await this.$apiBase.$get(`get-settings?type=absensimatan&program=${program}&tahun=${tahun}&kelas=${activeKelas}`);

      if (resSelect && resSelect.length > 0) {
        commit("setMatanList", resSelect);
      } else {
        if (!isManualChange) {
          Swal.fire({
            position: "center",
            icon: "warning",
            text: "Anda tidak mengajar matan apapun di kelas ini",
          });
        }
        commit("setMatanList", []);
      }
    } catch (error) {
      console.error("Error fetching matan units:", error);
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },

  async getDataSantri({ commit, dispatch, state }) {
    dispatch("index/submitLoad", null, { root: true });

    try {
      const program = localStorage.getItem("program");
      const activeKelas = state.selectedKelas; // <-- Use state instead of $auth

      if (!activeKelas) {
        commit("setDataSantri", []);
        return;
      }

      const result = await this.$apiSantri.$get(`get-absensi-sisalam?type=every&subject=kelas&program=${program}&value=${activeKelas}`);
      commit("setDataSantri", result);
    } catch (error) {
      console.error("Error fetching santri data:", error);
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },
  // Inside actions.js
  async getDetail({ commit, dispatch }, data) {
    dispatch("index/submitLoad", null, { root: true });
    const sk = data.replace(/#/g, "%23");

    // Encode the subject because it now contains multiple `#` from the SK Matan
    const subject = localStorage.getItem("subject").replace(/#/g, "%23");

    const reqDetail = await this.$apiSantri.$get(`get-logs?subject=${subject}&sksantri=${sk}`);

    commit("setDetailSantri", reqDetail);
    dispatch("index/submitLoad", null, { root: true });
  },

  async submit({ commit, dispatch, state, rootState }, event) {
    commit("btn");
    const data = Object.fromEntries(new FormData(event.target));

    data["From"] = state.fromPage;
    data["To"] = state.toPage;
    data["Page"] = +data.Page;
    data["Score"] = +data.Score;

    if (data.Page === 0 || !data.From || !data.To) {
      Swal.fire({
        text: "Halaman awal dan akhir tidak boleh kosong!",
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
      commit("btn");
      return;
    }

    try {
      const kelas = state.detail.Kelas;
      const tahun = rootState.index.label;
      const halaqah = state.detail.Halaqah;
      const sk = state.detail.SK.replace(/#/g, "%23");

      // Safely encode the new subject
      const subject = localStorage.getItem("subject").replace(/#/g, "%23");

      const result = await this.$apiSantri.$post(`input-logs?kls=${kelas}&subject=${subject}&sksantri=${sk}&halaqah=${halaqah}&thn=${tahun}`, data);

      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil di input",
          showConfirmButton: false,
          timer: 1500,
        });
        commit("btn");
        commit("pushDetail", result);
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

  async submitUpdate({ state, dispatch, commit, rootState }, event) {
    commit("btn");
    const data = Object.fromEntries(new FormData(event.target));

    data["From"] = state.fromPageUpdate;
    data["To"] = state.toPageUpdate;
    data["Page"] = +data.Page;
    data["Score"] = +data.Score;

    if (data.Page === 0 || !data.From || !data.To) {
      Swal.fire({
        text: "Halaman awal dan akhir tidak boleh kosong!",
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
      commit("btn");
      return;
    }

    try {
      const sk = state.updateData.SK.replace(/ /g, "%20");
      const sksantri = state.detail.SK.replace(/#/g, "%23");

      // Safely encode the new subject
      const subject = localStorage.getItem("subject").replace(/#/g, "%23");

      const result = await this.$apiSantri.$put(`update-logs?subject=${subject}&sksantri=${sksantri}&sk=${sk}`, data);

      if (result) {
        commit("btn");
        commit("updateDetail", result);
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil di update",
          showConfirmButton: false,
          timer: 1500,
        });
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
};
