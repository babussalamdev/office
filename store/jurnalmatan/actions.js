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

    // 1. Fetch Class list dynamically if it's empty
    if (!state.kelas || state.kelas.length === 0) {
      const result = await this.$apiBase.$get(`get-settings?sk=${program}&type=kelas`);
      const kelasArray = result.kelas || [];

      commit("setState", { key: "kelas", value: kelasArray });

      // Auto-select the first class if none is selected
      if (kelasArray.length > 0 && !state.selectedKelas) {
        commit("setState", { key: "selectedKelas", value: kelasArray[0].Nama });
      }
    }

    const activeKelas = state.selectedKelas;

    if (!activeKelas) {
      commit("setState", { key: "datas", value: [] });
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    // 2. Fetch Matan based on the active class
    const result = await this.$apiBase.$get(`get-settings?type=absensimatan&program=${program}&tahun=${tahun}&kelas=${activeKelas}`);

    if (result && result.length > 0) {
      commit("setState", { key: "datas", value: result });
    } else {
      // Use SweetAlert only if data is empty on initial load or change
      if (!isManualChange) {
        Swal.fire({
          position: "center",
          icon: "warning",
          text: "Anda tidak mengajar matan apapun di kelas ini",
        });
      }
      commit("setState", { key: "datas", value: [] });
    }

    dispatch("index/submitLoad", null, { root: true });
  },

  async getData({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });
    if (state.selectedMatan && state.selectedKelas) {
      const subject = state.selectedMatan;
      const kelas = state.selectedKelas;
      const tahun = rootState.index.label;
      const semester = rootState.index.semester;

      const result = await this.$apiBase.$get(`get-journal?type=journal&subject=${subject}&thn=${tahun}&smstr=${semester}&kls=${kelas}`);

      if (result) {
        commit("setState", { key: "values", value: result });
      }
      dispatch("index/submitLoad", null, { root: true });
    }
  },

  async submit({ commit, state, rootState }, event) {
    commit("btn");
    const data = Object.fromEntries(new FormData(event.target));

    data["Session"] = state.schedule.Hari || "-";
    data["Subject"] = state.schedule.SK.split("#")[3];

    const program = localStorage.getItem("program");
    const tahun = rootState.index.label;
    const semester = rootState.index.semester;
    const kelas = state.selectedKelas;

    const result = await this.$apiBase.$post(`input-journal?type=journal&program=${program}&thn=${tahun}&smstr=${semester}&kls=${kelas}`, data);

    if (result) {
      commit("btn");
      commit("setValues", result);
    }
  },

  async update({ commit, state }, event) {
    commit("btn");
    const data = Object.fromEntries(new FormData(event.target));
    data["Session"] = state.updateData.Session || "-";

    const program = localStorage.getItem("program");
    const kelas = state.selectedKelas;
    const sk = state.updateData.SK.replace(/#/g, "%23");

    const result = await this.$apiBase.$put(`update-journal?type=journal&program=${program}&kls=${kelas}&sk=${sk}`, data);

    if (result) {
      commit("updateValues", result);
      commit("btn");
    }
  },
};
