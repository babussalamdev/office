import Swal from "sweetalert2";

export default {
  async changeUnit({ commit, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const tahun = rootState.index.label;

    if (!tahun) {
      dispatch("index/submitLoad", null, { root: true });
      this.$router.push("/");
      return;
    }

    // Set static kelas options directly from user Auth payload
    const kelas = this.$auth.user.Kelas[program];
    commit("setState", { key: "kelasOptions", value: kelas });

    const result = await this.$apiBase.$get(`get-settings?type=absensimatan&program=${program}&tahun=${tahun}&kelas=${kelas}`);

    if (result.length > 0) {
      dispatch("index/submitLoad", null, { root: true });
      commit("setState", { key: "datas", value: result });
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        text: "Anda tidak mengajar apapun hari ini",
      });
      dispatch("index/submitLoad", null, { root: true });
    }
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
        dispatch("index/submitLoad", null, { root: true });
      }
    }
  },

  async submit({ commit, state, rootState }, event) {
    commit("btn");
    const data = Object.fromEntries(new FormData(event.target));
    console.log(state.schedule);

    data["Session"] = state.schedule.Hari || "-"; // Fallback to '-' if Hari doesn't exist for Matan
    data["Subject"] = state.schedule.SK.split("#")[3];

    const program = localStorage.getItem("program");
    const tahun = rootState.index.label;
    const semester = rootState.index.semester;
    const kelas = state.selectedKelas;
    console.log(data);

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
